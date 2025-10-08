let count = 0;

export default defineCachedEventHandler(
  () => {
    count++;
    return {
      count,
      date: new Date().toISOString(),
    };
  },
  { maxAge: 10 /* 10 seconds */ },
);
