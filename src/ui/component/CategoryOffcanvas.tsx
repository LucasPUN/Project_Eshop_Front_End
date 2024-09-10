import { Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';

interface CategoryOffcanvasProps {
  show: boolean;
  handleClose: () => void;
  categories: string[];
}

const CategoryOffcanvas: React.FC<CategoryOffcanvasProps> = ({ show, handleClose, categories }) => {
  return (
    <Drawer anchor="left" open={show} onClose={handleClose}>
      <div style={{ width: 250, padding: 16 }}>
        <Typography variant="h6" gutterBottom>商品類別</Typography>
        <List>
          {categories.map((category, index) => (
            <ListItem button key={index}>
              <ListItemText primary={category} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default CategoryOffcanvas;
