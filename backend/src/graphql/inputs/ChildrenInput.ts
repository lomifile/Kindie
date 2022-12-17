import { Field, InputType } from "type-graphql";

@InputType()
export class ChildrenInput {
	@Field()
	Name: string;
	@Field()
	Surname: string;
	@Field()
	BirthDate: Date;
	@Field()
	OIB: number;
	@Field()
	Remarks: string;
	@Field()
	Gender: string;
	@Field({ nullable: true })
	mother: number;
	@Field({ nullable: true })
	father: number;
}
