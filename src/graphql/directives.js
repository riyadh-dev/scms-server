const { defaultFieldResolver } = require('graphql');
const { ForbiddenError, SchemaDirectiveVisitor } = require('apollo-server-express');

class AuthDirective extends SchemaDirectiveVisitor {
	visitObject(type) {
		this.ensureFieldsWrapped(type);
		type._requiredAuthRole = this.args.requires;
	}

	// Visitor methods for nested types like fields and arguments
	// also receive a details object that provides information about
	// the parent and grandparent types.
	visitFieldDefinition(field, details) {
		this.ensureFieldsWrapped(details.objectType);
		field._requiredAuthRole = this.args.requires;
	}

	ensureFieldsWrapped(objectType) {
		// Mark the GraphQLObjectType object to avoid re-wrapping:
		if (objectType._authFieldsWrapped) return;
		objectType._authFieldsWrapped = true;

		const fields = objectType.getFields();

		Object.keys(fields).forEach(fieldName => {
			const field = fields[fieldName];
			const { resolve = defaultFieldResolver } = field;

			field.resolve = async function (...args) {
				// Get the required Role from the field first, falling back
				// to the objectType if no Role is required by the field:
				const context = args[2];
				if(!context.user)
					throw new ForbiddenError('Must be Logged In');

				const requiredRole =
					field._requiredAuthRole ||
					objectType._requiredAuthRole;
				
				if (!requiredRole) {
					return resolve.apply(this, args);
				}

				const roles = context.user.roles;
				if (!roles.includes(requiredRole)) {
					throw new ForbiddenError('not authorized');
				}

				return resolve.apply(this, args);
			};
		});
	}
}

module.exports = {
	auth: AuthDirective
};