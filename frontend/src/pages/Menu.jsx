export default function Menu() {
  const items = [
    { name: 'Burger', price: '$10' },
    { name: 'Wings', price: '$8' }
  ];
  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl mb-4">Menu</h1>
      {items.map(i => (
        <div key={i.name} className="mb-2">{i.name} - {i.price}</div>
      ))}
    </div>
  );
}
