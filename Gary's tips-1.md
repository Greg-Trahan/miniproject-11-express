On Server:

- Make sure express can handle POST submissions
- Make express is listening on whatever routes the client is sending info for

On Client Side:

- Send any submissions meant for the server via fetch
  Requests that have form data are sent via POST, which an application/hjson header and a stringified body
