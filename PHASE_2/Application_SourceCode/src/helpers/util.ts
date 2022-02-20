export const validateInput = (input: string): boolean => {
  const validation = new RegExp(/^[a-zA-z0-9 ]{1,20}$/);
  return validation.test(input.trim());
}
