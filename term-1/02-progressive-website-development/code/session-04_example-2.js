function renderedWidth({ width, padding, border, boxSizing }) {
  return boxSizing === 'border-box' ? width : width + 2 * padding + 2 * border;
}
const box = { width: 300, padding: 20, border: 5 };
console.log('content-box :', renderedWidth({ ...box, boxSizing: 'content-box' }), 'px');
console.log('border-box  :', renderedWidth({ ...box, boxSizing: 'border-box' }), 'px');
console.log('content area with border-box:', box.width - 2 * box.padding - 2 * box.border, 'px');
