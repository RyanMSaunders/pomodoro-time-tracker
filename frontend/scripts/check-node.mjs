const [major] = process.versions.node.split('.').map(Number);
if (major !== 24) {
  console.error(
    `Node 24 required (found ${process.versions.node}). Run: nvm use`
  );
  process.exit(1);
}
