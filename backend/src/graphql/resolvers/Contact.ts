import { Contact } from "@orm/entities";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { ContactInput } from "@graphql/inputs";
import { sendMail } from "@utils/SendEmail";
import { LogAction } from "@root/middleware/LogAction";

@Resolver(Contact)
export class ContactResolver {
	@Mutation(() => Boolean)
	@UseMiddleware(LogAction)
	async sendEmail(@Arg("input") input: ContactInput): Promise<Boolean> {
		const result = await Contact.create({
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
			await sendMail("fivanusec@gmail.com", input.subject, input.message);

			return true;
		}

		return false;
	}
}
