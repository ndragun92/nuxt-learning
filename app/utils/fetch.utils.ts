type TFetchError = {
  response: {
    _data: {
      message: string;
    };
  };
};

export const catchError = async <T>(
  promise: Promise<T>,
): Promise<
  | [undefined, T]
  | [
      {
        error: Error | unknown;
        _message: string;
      },
    ]
> => {
  return promise
    .then((data) => {
      return [undefined, data] as [undefined, T];
    })
    .catch((error: unknown) => {
      return [
        {
          error,
          _message:
            (error as TFetchError)?.response?._data?.message ||
            "Something went wrong",
        },
      ];
    });
};
