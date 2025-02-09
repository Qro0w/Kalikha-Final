import React, { createContext, useContext, useState } from 'react';

// Create the context
const SubcategoryContext = createContext();

// Custom hook to access subcategory
export const useSubcategory = () => {
  return useContext(SubcategoryContext);
};

// Provider component
export const SubcategoryProvider = ({ children }) => {
  const [subcategory, setSubcategory] = useState(null);

  return (
    <SubcategoryContext.Provider value={{ subcategory, setSubcategory }}>
      {children}
    </SubcategoryContext.Provider>
  );
};
