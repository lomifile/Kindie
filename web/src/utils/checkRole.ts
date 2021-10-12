export const checkRole = (
  input: string,
  role: "Headmaster" | "Pedagouge" | "Teacher"
) => {
  return input?.includes(role);
};
