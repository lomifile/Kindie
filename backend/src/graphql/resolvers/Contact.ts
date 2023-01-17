import { Contact } from "@orm/entities";
import {
	Arg,
	Mutation,
	ObjectType,
	Resolver,
	UseMiddleware
} from "type-graphql";
import { ContactInput } from "@graphql/inputs";
import { sendMail } from "@utils/SendEmail";
import { LogAction } from "@root/middleware/LogAction";
import BooleanResponse from "@root/utils/booleanResponseObject";

@ObjectType()
class ContactBooleanResponse extends BooleanResponse() {}

// TODO: When email is fixed test it
@Resolver(Contact)
export class ContactResolver {
	@Mutation(() => ContactBooleanResponse)
	@UseMiddleware(LogAction)
	async sendEmail(
		@Arg("input") input: ContactInput
	): Promise<ContactBooleanResponse> {
		let result: Contact;
		try {
			result = await Contact.create({
				Email: input.email,
				Subject: input.subject,
				Message: input.message
			}).save();

			if (result) {
				await sendMail(
					input.email,
					input.subject,
					`
            This is automated message!
            We will respond to you as soon as we can!
        `
				);
			}
		} catch (err) {
			return {
				errors: [
					{
						field: err.name,
						message: err.message
					}
				]
			};
		}
		return {
			result: result.hasId()
		};
	}
}
