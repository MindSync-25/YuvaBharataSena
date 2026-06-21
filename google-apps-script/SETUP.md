# Google Sheet Backend Setup

Use this setup for the `join.html` form.

1. Create a Google Sheet.
2. In the sheet, go to `Extensions` -> `Apps Script`.
3. Replace the default code with the contents of `Code.gs`.
4. Click `Deploy` -> `New deployment`.
5. Select type `Web app`.
6. Set `Execute as` to `Me`.
7. Set `Who has access` to `Anyone`.
8. Click `Deploy` and copy the Web app URL.
9. Paste that URL into `JOIN_FORM_ENDPOINT` in both `docs/main.js` and `docs/docs/main.js`.

After this, every join form submission will be added to a sheet tab named `Join Submissions`.
