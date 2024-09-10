import { Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';

interface CategoryOffcanvasProps {
  show: boolean;
  handleClose: () => void;
  categories: string[];
  onCategorySelect: (category: string) => void;
}

const CategoryOffcanvas: React.FC<CategoryOffcanvasProps> = ({ show, handleClose, categories, onCategorySelect }) => {
  return (
    <Drawer anchor="left" open={show} onClose={handleClose}>
      <div style={{ width: 250, padding: 16 }}>
        <Typography variant="h6" gutterBottom>商品類別</Typography>
        <List>
          <ListItem button onClick={() => {
            onCategorySelect("All"); // Notify parent that "All" is selected
            handleClose(); // Close the drawer
          }}>
            <ListItemText primary="All" />
          </ListItem>
          {categories.map((category, index) => (
            <ListItem
              button
              key={index}
              onClick={() => {
                onCategorySelect(category); // Notify parent of the selected category
                handleClose(); // Close the drawer
              }}
            >
              <ListItemText primary={category} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default CategoryOffcanvas;
