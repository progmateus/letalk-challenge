{
  optimization: {
    // minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: { // keep same path with index.js => swaggerOptions.api
          condition: /^\**!|@swagger/i,
          filename: (fileData) => {
            // The "fileData" argument contains object with "filename", "basename", "query" and "hash"
            return './controller/swaggerComments.js';
          },
        },
      }),
    ]
  }
}