// // function CategoryFilter({ categories, selected, onChange }) {
// //   return (
// //     <select
// //       value={selected}
// //       onChange={(e) => onChange(e.target.value)}
// //       className="category-filter"
// //     >
// //       {categories.map((c) => (
// //         <option key={c.name || c.slug} value={c.name || c.slug}>
// //           {c.name || c.slug}
// //         </option>
// //       ))}
// //     </select>
// //   );
// // }

// // export default CategoryFilter;  // << ye line add karo


// // function CategoryFilter({ categories, selected, onChange }) {
// //   return (
// //     <select
// //       value={selected}
// //       onChange={(e) => onChange(e.target.value)}
// //       className="category-filter"
// //     >
// //       {categories.map((c, index) => (
// //         <option key={`${c}-${index}`} value={c}>
// //           {c}
// //         </option>
// //       ))}
// //     </select>
// //   );
// // }

// // export default CategoryFilter;



// function CategoryFilter({ categories, selected, onChange }) {
//   return (
//     <select
//       value={selected}
//       onChange={(e) => onChange(e.target.value)}
//       className="category-filter"
//     >
//       {categories.map((c, index) => (
//         <option key={`${c}-${index}`} value={c}>
//           {c}
//         </option>
//       ))}
//     </select>
//   );
// }

// export default CategoryFilter;



function CategoryFilter({ categories, selected, onChange }) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="category-filter"
    >
      {categories.map((c, index) => {
        const value = typeof c === "string" ? c : c.name || c.slug;
        return (
          <option key={`${value}-${index}`} value={value}>
            {value}
          </option>
        );
      })}
    </select>
  );
}

export default CategoryFilter;
