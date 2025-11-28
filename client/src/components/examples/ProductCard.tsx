import ProductCard from '../ProductCard';

export default function ProductCardExample() {
  return (
    <div className="max-w-xs">
      <ProductCard
        id="P001"
        name="Premium Electric Kettle"
        category="Kitchen Appliances"
        manufacturingCost={450}
        distributorPrice={650}
        mrp={999}
        moq={50}
        inStock={true}
        onView={() => console.log('View product')}
        onAddToCart={() => console.log('Add to cart')}
      />
    </div>
  );
}
