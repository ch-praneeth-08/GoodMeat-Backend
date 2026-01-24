# Database Seeding Guide

This guide explains how to populate your GOODMEAT database with sample data inspired by Licious.com.

## Overview

The seed script (`seed-data.js`) creates a complete dataset including:
- **5 Categories**: Chicken, Mutton, Fish & Seafood, Prawns, Ready to Cook
- **22 Sub-categories**: Various cuts and types for each category
- **25 Products**: Sample products with realistic prices and descriptions

## Prerequisites

Before running the seed script, ensure you have:

1. **MongoDB Connection**: Your `.env` file must contain a valid `MONGO_URI`
2. **Node.js**: Version 14 or higher
3. **Dependencies Installed**: Run `npm install` if you haven't already

## How to Run the Seed Script

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Run the Seed Script

```bash
npm run seed
```

### Step 3: Follow the Prompts

The script will ask you:

```
⚠️  Do you want to clear existing data? (yes/no):
```

- **Type `yes`** (or `y`): Clears all existing categories, sub-categories, and products before seeding
- **Type `no`** (or `n`): Adds new data without clearing existing data

## What Data Will Be Created?

### Categories (5)

1. **Chicken** - Fresh, antibiotic-free chicken cuts
2. **Mutton** - Premium quality mutton and lamb
3. **Fish & Seafood** - Fresh catch from the sea
4. **Prawns** - Premium prawns and shrimps
5. **Ready to Cook** - Marinated and ready to cook products

### Sub-categories (22)

#### Chicken (5)
- Curry Cut
- Boneless
- Wings & Drumsticks
- Whole Chicken
- Mince

#### Mutton (5)
- Curry Cut
- Boneless
- Mince
- Liver & Organs
- Whole Leg

#### Fish & Seafood (4)
- Bengali Cut
- Curry Cut
- Fillet
- Whole Fish

#### Prawns (4)
- Small Prawns
- Medium Prawns
- Large Prawns
- Peeled & Deveined

#### Ready to Cook (4)
- Chicken
- Mutton
- Fish
- Prawns

### Products (25)

Sample products include:
- Chicken Curry Cut (₹249/500g)
- Chicken Boneless (₹299/500g)
- Mutton Curry Cut (₹599/500g)
- Rohu Fish Bengali Cut (₹349/500g)
- Large Prawns (₹749/500g)
- Tandoori Chicken - Ready to Cook (₹349/500g, discounted to ₹299)
- And 19 more products...

## Expected Output

When the script runs successfully, you'll see:

```
═══════════════════════════════════════════════
🌱 GOODMEAT DATABASE SEEDING SCRIPT
═══════════════════════════════════════════════

🔌 Connecting to MongoDB...
✅ Connected to MongoDB successfully!

📦 Creating categories...
   ✓ Created category: Chicken
   ✓ Created category: Mutton
   ...
✅ Categories created!

📦 Creating sub-categories...
   ✓ Created sub-category: Chicken > Curry Cut
   ✓ Created sub-category: Chicken > Boneless
   ...
✅ Sub-categories created!

📦 Creating products...
   ✓ Created product: Chicken Curry Cut
   ✓ Created product: Chicken Boneless
   ...
✅ Created 25 products!

═══════════════════════════════════════════════
🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!
═══════════════════════════════════════════════
📊 Summary:
   • Categories: 5
   • Sub-categories: 22
   • Products: 25
═══════════════════════════════════════════════
```

## How to Clear and Reseed Data

If you want to completely refresh your database:

1. Run the seed script: `npm run seed`
2. When prompted, type `yes` to clear existing data
3. The script will delete all products, sub-categories, and categories
4. Then it will create fresh data

## Customizing the Data

To modify the seed data, edit `seed-data.js`:

### Adding New Categories

Locate the `categoriesData` array and add:

```javascript
{
  name: 'Your Category Name',
  description: 'Your description',
  image: 'your-image-url'
}
```

### Adding New Sub-categories

Locate the `subCategoriesData` object and add:

```javascript
'Your Category Name': [
  { name: 'Sub-category Name', image: 'image-url' },
  // Add more sub-categories...
]
```

### Adding New Products

Locate the `getProductsData` function and add products following the same structure as existing ones.

## Placeholder Images

The seed script uses placeholder images from:
- `https://via.placeholder.com/` - Color-coded by category
- Cloudinary demo images for categories

For production, replace these with actual product images.

## Troubleshooting

### Error: MONGO_URI is not defined

**Solution**: Create or update your `.env` file in the backend directory:

```env
MONGO_URI=mongodb://your-connection-string
```

### Error: Category already exists

**Solution**: This happens when running without clearing existing data. Either:
- Run with `yes` to clear existing data
- Manually change category names in the seed script to avoid duplicates

### Connection Timeout

**Solution**: Check your MongoDB connection string and ensure your database is accessible.

## Notes

- The script uses transactions for data integrity
- All products have realistic Indian prices in ₹ (Rupees)
- Some products include discount prices to showcase the discount feature
- All products are marked as "in stock" by default
- Each product belongs to one category but can have multiple sub-categories

## After Seeding

Once seeding is complete:

1. Start your backend server: `npm run dev`
2. Start your frontend: `cd ../frontend && npm run dev`
3. Navigate to the admin dashboard to see all the products
4. Visit the products page to see the categories and products

## Resetting Database

To completely reset your database to a clean state:

1. Run: `npm run seed`
2. Choose `yes` when prompted
3. Your database will be cleared and reseeded with sample data

---

**Need help?** Check the console output for detailed error messages, or refer to the main project documentation.
