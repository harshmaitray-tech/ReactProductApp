import React from "react";

export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <div className="category-buttons">
      {categories.map((cat, index) => {
        if (typeof cat !== "string") return null;

        const displayName = cat.charAt(0).toUpperCase() + cat.slice(1);
        return (
          <button
            key={index}
            className={`category-btn ${selected === cat ? "active" : ""}`}
            onClick={() => onChange(cat)}
          >
            📦 {displayName}
          </button>
        );
      })}
    </div>
  );
}
