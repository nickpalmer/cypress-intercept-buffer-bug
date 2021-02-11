Steps to reproduce:

- Run `yarn`
- Run `yarn start`
- Run "intercept.js" test and note the failure
- Check the cypress/downloads folder and open both PDFs. They are not the same

This is likely the same bug as https://github.com/cypress-io/cypress/issues/9359
just on the download side instead of the upload side.

The toString() is incorrect:
https://github.com/cypress-io/cypress/blob/develop/packages/net-stubbing/lib/server/intercept-request.ts#L116

I do not understand why you would ever want a toString() here, and if you want to do toString()
you should consider checking the mime type starts with `text/` instead but you STILL need to know
the encoding because maybe the buffer is utf-8 or maybe it is utf-16 and calling toString()
will screw up the bytes.