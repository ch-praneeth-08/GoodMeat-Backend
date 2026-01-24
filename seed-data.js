const mongoose = require('mongoose');
const readline = require('readline');
require('dotenv').config();

const Category = require('./models/category.model');
const SubCategory = require('./models/subcategory.model');
const Product = require('./models/product.model');
const logger = require('./config/logger');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to ask questions
const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

// Sample data inspired by Licious.com
const categoriesData = [
  {
    name: 'Chicken',
    description: 'Fresh, antibiotic-free chicken cuts',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/food/chicken.jpg'
  },
  {
    name: 'Mutton',
    description: 'Premium quality mutton and lamb',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/food/mutton.jpg'
  },
  {
    name: 'Fish & Seafood',
    description: 'Fresh catch from the sea',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/food/fish.jpg'
  },
  {
    name: 'Prawns',
    description: 'Premium prawns and shrimps',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/food/prawns.jpg'
  },
  {
    name: 'Ready to Cook',
    description: 'Marinated and ready to cook products',
    image: 'https://res.cloudinary.com/demo/image/upload/v1/food/ready-to-cook.jpg'
  }
];

const subCategoriesData = {
  'Chicken': [
    { name: 'Curry Cut', image: 'https://placehold.co/300x300/ff6b6b/white?text=Curry+Cut' },
    { name: 'Boneless', image: 'https://placehold.co/300x300/ff6b6b/white?text=Boneless' },
    { name: 'Wings & Drumsticks', image: 'https://placehold.co/300x300/ff6b6b/white?text=Wings' },
    { name: 'Whole Chicken', image: 'https://placehold.co/300x300/ff6b6b/white?text=Whole+Chicken' },
    { name: 'Mince', image: 'https://placehold.co/300x300/ff6b6b/white?text=Mince' }
  ],
  'Mutton': [
    { name: 'Curry Cut', image: 'https://placehold.co/300x300/8b4513/white?text=Curry+Cut' },
    { name: 'Boneless', image: 'https://placehold.co/300x300/8b4513/white?text=Boneless' },
    { name: 'Mince', image: 'https://placehold.co/300x300/8b4513/white?text=Mince' },
    { name: 'Liver & Organs', image: 'https://placehold.co/300x300/8b4513/white?text=Liver' },
    { name: 'Whole Leg', image: 'https://placehold.co/300x300/8b4513/white?text=Whole+Leg' }
  ],
  'Fish & Seafood': [
    { name: 'Bengali Cut', image: 'https://placehold.co/300x300/4169e1/white?text=Bengali+Cut' },
    { name: 'Curry Cut', image: 'https://placehold.co/300x300/4169e1/white?text=Curry+Cut' },
    { name: 'Fillet', image: 'https://placehold.co/300x300/4169e1/white?text=Fillet' },
    { name: 'Whole Fish', image: 'https://placehold.co/300x300/4169e1/white?text=Whole+Fish' }
  ],
  'Prawns': [
    { name: 'Small Prawns', image: 'https://placehold.co/300x300/ff69b4/white?text=Small+Prawns' },
    { name: 'Medium Prawns', image: 'https://placehold.co/300x300/ff69b4/white?text=Medium+Prawns' },
    { name: 'Large Prawns', image: 'https://placehold.co/300x300/ff69b4/white?text=Large+Prawns' },
    { name: 'Peeled & Deveined', image: 'https://placehold.co/300x300/ff69b4/white?text=Peeled' }
  ],
  'Ready to Cook': [
    { name: 'Chicken', image: 'https://placehold.co/300x300/32cd32/white?text=Chicken+RTC' },
    { name: 'Mutton', image: 'https://placehold.co/300x300/32cd32/white?text=Mutton+RTC' },
    { name: 'Fish', image: 'https://placehold.co/300x300/32cd32/white?text=Fish+RTC' },
    { name: 'Prawns', image: 'https://placehold.co/300x300/32cd32/white?text=Prawns+RTC' }
  ]
};

// Products data with proper structure
const getProductsData = (categoryMap, subCategoryMap) => [
  // Chicken Products
  {
    name: 'Chicken Curry Cut',
    description: 'Classic curry cut with bone - perfect for traditional curries and gravies',
    price: 249,
    unit: 'per 500g',
    image: 'https://placehold.co/400x300/ff6b6b/white?text=Chicken+Curry+Cut',
    category: categoryMap['Chicken'],
    subCategories: [subCategoryMap['Chicken']['Curry Cut']],
    inStock: true,
    discountPrice: null
  },
  {
    name: 'Chicken Boneless',
    description: 'Premium boneless chicken breast - ideal for stir-fries and grills',
    price: 299,
    unit: 'per 500g',
    image: 'https://placehold.co/400x300/ff6b6b/white?text=Chicken+Boneless',
    category: categoryMap['Chicken'],
    subCategories: [subCategoryMap['Chicken']['Boneless']],
    inStock: true,
    discountPrice: null
  },
  {
    name: 'Chicken Wings',
    description: 'Juicy chicken wings - perfect for BBQ and appetizers',
    price: 189,
    unit: 'per 500g',
    image: 'https://placehold.co/400x300/ff6b6b/white?text=Chicken+Wings',
    category: categoryMap['Chicken'],
    subCategories: [subCategoryMap['Chicken']['Wings & Drumsticks']],
    inStock: true,
    discountPrice: 169
  },
  {
    name: 'Chicken Drumsticks',
    description: 'Perfect for grilling and roasting - kids favorite',
    price: 229,
    unit: 'per 500g',
    image: 'https://placehold.co/400x300/ff6b6b/white?text=Chicken+Drumsticks',
    category: categoryMap['Chicken'],
    subCategories: [subCategoryMap['Chicken']['Wings & Drumsticks']],
    inStock: true,
    discountPrice: null
  },
  {
    name: 'Chicken Mince',
    description: 'Freshly minced chicken - great for kebabs and meatballs',
    price: 199,
    unit: 'per 500g',
    image: 'https://placehold.co/400x300/ff6b6b/white?text=Chicken+Mince',
    category: categoryMap['Chicken'],
    subCategories: [subCategoryMap['Chicken']['Mince']],
    inStock: true,
    discountPrice: null
  },
  {
    name: 'Whole Chicken',
    description: 'Farm fresh whole chicken - antibiotic free',
    price: 399,
    unit: 'per kg',
    image: 'https://placehold.co/400x300/ff6b6b/white?text=Whole+Chicken',
    category: categoryMap['Chicken'],
    subCategories: [subCategoryMap['Chicken']['Whole Chicken']],
    inStock: true,
    discountPrice: 349
  },

  // Mutton Products
  {
    name: 'Mutton Curry Cut',
    description: 'Premium mutton curry cut with bone - perfect for rich curries',
    price: 599,
    unit: 'per 500g',
    image: 'https://placehold.co/400x300/8b4513/white?text=Mutton+Curry+Cut',
    category: categoryMap['Mutton'],
    subCategories: [subCategoryMap['Mutton']['Curry Cut']],
    inStock: true,
    discountPrice: null
  },
  {
    name: 'Mutton Boneless',
    description: 'Tender boneless mutton cubes - great for kebabs and biryani',
    price: 649,
    unit: 'per 500g',
    image: 'https://placehold.co/400x300/8b4513/white?text=Mutton+Boneless',
    category: categoryMap['Mutton'],
    subCategories: [subCategoryMap['Mutton']['Boneless']],
    inStock: true,
    discountPrice: null
  },
  {
    name: 'Mutton Mince',
    description: 'Freshly minced mutton - perfect for keema and seekh kebabs',
    price: 549,
    unit: 'per 500g',
    image: 'https://placehold.co/400x300/8b4513/white?text=Mutton+Mince',
    category: categoryMap['Mutton'],
    subCategories: [subCategoryMap['Mutton']['Mince']],
    inStock: true,
    discountPrice: 499
  },
  {
    name: 'Mutton Liver',
    description: 'Fresh mutton liver - rich in iron and nutrients',
    price: 399,
    unit: 'per 500g',
    image: 'https://placehold.co/400x300/8b4513/white?text=Mutton+Liver',
    category: categoryMap['Mutton'],
    subCategories: [subCategoryMap['Mutton']['Liver & Organs']],
    inStock: true,
    discountPrice: null
  },
  {
    name: 'Mutton Whole Leg',
    description: 'Premium whole mutton leg - ideal for special occasions',
    price: 899,
    unit: 'per kg',
    image: 'https://placehold.co/400x300/8b4513/white?text=Mutton+Leg',
    category: categoryMap['Mutton'],
    subCategories: [subCategoryMap['Mutton']['Whole Leg']],
    inStock: true,
    discountPrice: null
  },

  // Fish & Seafood Products
  {
    name: 'Rohu Fish Bengali Cut',
    description: 'Fresh water fish Bengali style - perfect for traditional fish curry',
    price: 349,
    unit: 'per 500g',
    image: 'https://placehold.co/400x300/4169e1/white?text=Rohu+Fish',
    category: categoryMap['Fish & Seafood'],
    subCategories: [subCategoryMap['Fish & Seafood']['Bengali Cut']],
    inStock: true,
    discountPrice: null
  },
  {
    name: 'Pomfret Whole',
    description: 'Premium pomfret fish - great for frying and grilling',
    price: 799,
    unit: 'per 500g',
    image: 'https://placehold.co/400x300/4169e1/white?text=Pomfret',
    category: categoryMap['Fish & Seafood'],
    subCategories: [subCategoryMap['Fish & Seafood']['Whole Fish']],
    inStock: true,
    discountPrice: 749
  },
  {
    name: 'Basa Fillet',
    description: 'Boneless basa fillet - quick cooking and versatile',
    price: 299,
    unit: 'per 500g',
    image: 'https://placehold.co/400x300/4169e1/white?text=Basa+Fillet',
    category: categoryMap['Fish & Seafood'],
    subCategories: [subCategoryMap['Fish & Seafood']['Fillet']],
    inStock: true,
    discountPrice: null
  },
  {
    name: 'Mackerel Whole',
    description: 'Fresh mackerel fish - rich in omega-3',
    price: 249,
    unit: 'per 500g',
    image: 'https://placehold.co/400x300/4169e1/white?text=Mackerel',
    category: categoryMap['Fish & Seafood'],
    subCategories: [subCategoryMap['Fish & Seafood']['Whole Fish']],
    inStock: true,
    discountPrice: null
  },

  // Prawns Products
  {
    name: 'Small Prawns',
    description: 'Fresh small prawns - perfect for curries and rice dishes',
    price: 399,
    unit: 'per 500g',
    image: 'https://placehold.co/400x300/ff69b4/white?text=Small+Prawns',
    category: categoryMap['Prawns'],
    subCategories: [subCategoryMap['Prawns']['Small Prawns']],
    inStock: true,
    discountPrice: null
  },
  {
    name: 'Medium Prawns',
    description: 'Medium size prawns - versatile and flavorful',
    price: 549,
    unit: 'per 500g',
    image: 'https://placehold.co/400x300/ff69b4/white?text=Medium+Prawns',
    category: categoryMap['Prawns'],
    subCategories: [subCategoryMap['Prawns']['Medium Prawns']],
    inStock: true,
    discountPrice: 499
  },
  {
    name: 'Large Prawns',
    description: 'Premium large prawns - restaurant quality',
    price: 749,
    unit: 'per 500g',
    image: 'https://placehold.co/400x300/ff69b4/white?text=Large+Prawns',
    category: categoryMap['Prawns'],
    subCategories: [subCategoryMap['Prawns']['Large Prawns']],
    inStock: true,
    discountPrice: null
  },
  {
    name: 'Prawns Peeled & Deveined',
    description: 'Cleaned and deveined - ready to cook',
    price: 649,
    unit: 'per 500g',
    image: 'https://placehold.co/400x300/ff69b4/white?text=Peeled+Prawns',
    category: categoryMap['Prawns'],
    subCategories: [subCategoryMap['Prawns']['Peeled & Deveined']],
    inStock: true,
    discountPrice: 599
  },

  // Ready to Cook Products
  {
    name: 'Tandoori Chicken',
    description: 'Marinated in authentic tandoori spices - just grill and serve',
    price: 349,
    unit: 'per 500g',
    image: 'https://placehold.co/400x300/32cd32/white?text=Tandoori+Chicken',
    category: categoryMap['Ready to Cook'],
    subCategories: [subCategoryMap['Ready to Cook']['Chicken']],
    inStock: true,
    discountPrice: 299
  },
  {
    name: 'Chicken Tikka',
    description: 'Boneless tikka pieces marinated in yogurt and spices',
    price: 329,
    unit: 'per 500g',
    image: 'https://placehold.co/400x300/32cd32/white?text=Chicken+Tikka',
    category: categoryMap['Ready to Cook'],
    subCategories: [subCategoryMap['Ready to Cook']['Chicken']],
    inStock: true,
    discountPrice: 279
  },
  {
    name: 'Mutton Seekh Kebab',
    description: 'Ready to cook kebabs - perfect for parties',
    price: 599,
    unit: 'per 500g',
    image: 'https://placehold.co/400x300/32cd32/white?text=Seekh+Kebab',
    category: categoryMap['Ready to Cook'],
    subCategories: [subCategoryMap['Ready to Cook']['Mutton']],
    inStock: true,
    discountPrice: null
  },
  {
    name: 'Fish Fry Cut',
    description: 'Marinated fish for frying - crispy and delicious',
    price: 399,
    unit: 'per 500g',
    image: 'https://placehold.co/400x300/32cd32/white?text=Fish+Fry',
    category: categoryMap['Ready to Cook'],
    subCategories: [subCategoryMap['Ready to Cook']['Fish']],
    inStock: true,
    discountPrice: 349
  },
  {
    name: 'Butter Chicken Boneless',
    description: 'Pre-marinated in butter chicken masala - restaurant taste at home',
    price: 379,
    unit: 'per 500g',
    image: 'https://placehold.co/400x300/32cd32/white?text=Butter+Chicken',
    category: categoryMap['Ready to Cook'],
    subCategories: [subCategoryMap['Ready to Cook']['Chicken']],
    inStock: true,
    discountPrice: null
  },
  {
    name: 'Prawns Tandoori',
    description: 'Marinated prawns ready for tandoor or grill',
    price: 679,
    unit: 'per 500g',
    image: 'https://placehold.co/400x300/32cd32/white?text=Prawns+Tandoori',
    category: categoryMap['Ready to Cook'],
    subCategories: [subCategoryMap['Ready to Cook']['Prawns']],
    inStock: true,
    discountPrice: 629
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    console.log('\n🔌 Connecting to MongoDB...');
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI is not defined in .env file');
    }
    
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB successfully!\n');

    // Ask user if they want to clear existing data
    const clearData = await askQuestion('⚠️  Do you want to clear existing data? (yes/no): ');
    
    if (clearData.toLowerCase() === 'yes' || clearData.toLowerCase() === 'y') {
      console.log('\n🗑️  Clearing existing data...');
      await Product.deleteMany({});
      console.log('   ✓ Products cleared');
      await SubCategory.deleteMany({});
      console.log('   ✓ Sub-categories cleared');
      await Category.deleteMany({});
      console.log('   ✓ Categories cleared');
      console.log('✅ All existing data cleared!\n');
    } else {
      console.log('\n📝 Skipping data clearing. New data will be added to existing data.\n');
    }

    // Create Categories
    console.log('📦 Creating categories...');
    const categoryMap = {};
    for (const catData of categoriesData) {
      try {
        const category = new Category(catData);
        const savedCategory = await category.save();
        categoryMap[catData.name] = savedCategory._id;
        console.log(`   ✓ Created category: ${catData.name}`);
      } catch (err) {
        if (err.code === 11000) {
          console.log(`   ⚠ Category already exists: ${catData.name}`);
          const existingCat = await Category.findOne({ name: catData.name });
          categoryMap[catData.name] = existingCat._id;
        } else {
          throw err;
        }
      }
    }
    console.log('✅ Categories created!\n');

    // Create SubCategories
    console.log('📦 Creating sub-categories...');
    const subCategoryMap = {};
    for (const [categoryName, subCats] of Object.entries(subCategoriesData)) {
      const parentCategoryId = categoryMap[categoryName];
      if (!parentCategoryId) {
        console.log(`   ⚠ Parent category not found: ${categoryName}`);
        continue;
      }

      subCategoryMap[categoryName] = {};
      const subCategoryIds = [];

      for (const subCatData of subCats) {
        try {
          const subCategory = new SubCategory({
            name: subCatData.name,
            image: subCatData.image,
            parentCategory: parentCategoryId
          });
          const savedSubCategory = await subCategory.save();
          subCategoryMap[categoryName][subCatData.name] = savedSubCategory._id;
          subCategoryIds.push(savedSubCategory._id);
          console.log(`   ✓ Created sub-category: ${categoryName} > ${subCatData.name}`);
        } catch (err) {
          if (err.code === 11000) {
            console.log(`   ⚠ Sub-category already exists: ${categoryName} > ${subCatData.name}`);
            const existingSubCat = await SubCategory.findOne({ 
              name: subCatData.name, 
              parentCategory: parentCategoryId 
            });
            if (existingSubCat) {
              subCategoryMap[categoryName][subCatData.name] = existingSubCat._id;
              subCategoryIds.push(existingSubCat._id);
            }
          } else {
            throw err;
          }
        }
      }

      // Update category with sub-category references
      await Category.findByIdAndUpdate(parentCategoryId, {
        subCategories: subCategoryIds
      });
    }
    console.log('✅ Sub-categories created!\n');

    // Create Products
    console.log('📦 Creating products...');
    const productsData = getProductsData(categoryMap, subCategoryMap);
    let productCount = 0;
    
    for (const productData of productsData) {
      try {
        const product = new Product(productData);
        await product.save();
        productCount++;
        console.log(`   ✓ Created product: ${productData.name}`);
      } catch (err) {
        console.log(`   ⚠ Error creating product ${productData.name}:`, err.message);
      }
    }
    console.log(`✅ Created ${productCount} products!\n`);

    // Summary
    console.log('═══════════════════════════════════════════════');
    console.log('🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log('═══════════════════════════════════════════════');
    console.log(`📊 Summary:`);
    console.log(`   • Categories: ${Object.keys(categoryMap).length}`);
    console.log(`   • Sub-categories: ${Object.values(subCategoryMap).reduce((acc, obj) => acc + Object.keys(obj).length, 0)}`);
    console.log(`   • Products: ${productCount}`);
    console.log('═══════════════════════════════════════════════\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    logger.error('Seeding error: %o', error);
  } finally {
    rl.close();
    await mongoose.connection.close();
    console.log('🔌 Database connection closed.');
    process.exit(0);
  }
}

// Run the seeding function
console.log('\n═══════════════════════════════════════════════');
console.log('🌱 GOODMEAT DATABASE SEEDING SCRIPT');
console.log('═══════════════════════════════════════════════');
seedDatabase();
