const mongoose = require('mongoose');
require('dotenv').config();

const Category = require('./models/category.model');
const SubCategory = require('./models/subcategory.model');
const Product = require('./models/product.model');

async function clearDatabase() {
  try {
    // Connect to MongoDB
    console.log('\n🔌 Connecting to MongoDB...');
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI is not defined in .env file');
    }
    
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB successfully!\n');

    // Clear all collections
    console.log('🗑️  Clearing database collections...');
    
    const productCount = await Product.countDocuments();
    await Product.deleteMany({});
    console.log(`   ✓ Products cleared (${productCount} deleted)`);
    
    const subCategoryCount = await SubCategory.countDocuments();
    await SubCategory.deleteMany({});
    console.log(`   ✓ Sub-categories cleared (${subCategoryCount} deleted)`);
    
    const categoryCount = await Category.countDocuments();
    await Category.deleteMany({});
    console.log(`   ✓ Categories cleared (${categoryCount} deleted)`);
    
    console.log('\n═══════════════════════════════════════════════');
    console.log('🎉 DATABASE CLEARED SUCCESSFULLY!');
    console.log('═══════════════════════════════════════════════');
    console.log(`📊 Total items deleted:`);
    console.log(`   • Categories: ${categoryCount}`);
    console.log(`   • Sub-categories: ${subCategoryCount}`);
    console.log(`   • Products: ${productCount}`);
    console.log('═══════════════════════════════════════════════\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed.\n');
    process.exit(0);
  }
}

// Run the clearing function
console.log('\n═══════════════════════════════════════════════');
console.log('🧹 GOODMEAT DATABASE CLEARING SCRIPT');
console.log('═══════════════════════════════════════════════');
clearDatabase();
