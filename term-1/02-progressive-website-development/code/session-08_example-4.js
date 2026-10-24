const pattern = new RegExp('^(?:03[0-9]{9})$');   // what pattern="03[0-9]{9}" means
for (const v of ['03001234567', '3001234567', '0300-1234567', '030012345678']) {
  console.log(v.padEnd(14), pattern.test(v) ? 'valid' : 'invalid');
}
