export default defineEventHandler(async (event) => {
  const { user } = await getUserFromEvent(event);

  // Return only safe fields
  const safeUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  return { user: safeUser };
});
