function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
  expenses,
}) {
  const categories = [
    "All",
    ...new Set(expenses.map((expense) => expense.category)),
  ];

  return (
    <div className="category-filter">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
