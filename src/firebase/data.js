import { db, collection, addDoc } from "./config.js";

async function uploadData() {
    const mealsData = [
        {
            name: "Strawberry Salad",
            price: 120,
            category: "Breakfast",
            description:
                "A refreshing strawberry salad with walnuts, honey, and a hint of mint.",
            mealDetails:
                "A light and nutritious breakfast option rich in antioxidants and fiber.",
            ingredients: [
                "Fresh Strawberries",
                "Walnuts",
                "Organic Honey",
                "Fresh Mint Leaves",
            ],
            image:
                "https://thebotaniq.com/wp-content/uploads/2021/11/manganese-food-sources.jpg",
        },
        {
            name: "Grilled Chicken with Quinoa",
            price: 150,
            category: "Lunch",
            description:
                "Perfectly grilled chicken breast served with fluffy quinoa and seasoned vegetables.",
            mealDetails:
                "A high-protein meal rich in essential amino acids and healthy fats.",
            ingredients: [
                "Chicken Breast",
                "Quinoa",
                "Olive Oil",
                "Lemon Juice",
                "Garlic",
                "Black Pepper & Sea Salt",
            ],
            image:
                "https://www.themealdb.com/images/media/meals/hglsbl1614346998.jpg",
        },
        {
            name: "Avocado Sandwich",
            price: 120,
            category: "Breakfast",
            description:
                "A creamy avocado spread on whole wheat bread with fresh tomato slices.",
            mealDetails:
                "A heart-healthy sandwich packed with good fats and essential nutrients.",
            ingredients: [
                "Ripe Avocado",
                "Whole Wheat Bread",
                "Cherry Tomatoes",
                "Extra Virgin Olive Oil",
                "Black Pepper & Sea Salt",
            ],
            image:
                "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/09/avocado-sandwich-recipe.jpg",
        },
        {
            name: "Grilled Salmon with Greens",
            price: 180,
            category: "Dinner",
            description:
                "Tender grilled salmon served with sautéed greens and a lemon-garlic dressing.",
            mealDetails:
                "A high-protein, omega-3-rich dish that promotes heart health.",
            ingredients: [
                "Fresh Salmon Fillet",
                "Olive Oil",
                "Garlic",
                "Lemon Juice",
                "Spinach",
                "Kale",
                "Black Pepper & Sea Salt",
            ],
            image: "https://www.themealdb.com/images/media/meals/1549542994.jpg",
        },
        {
            name: "Oatmeal Bowl",
            price: 110,
            category: "Breakfast",
            description:
                "A warm and hearty oatmeal bowl topped with bananas, almonds, and honey.",
            mealDetails:
                "A fiber-rich meal that provides sustained energy throughout the day.",
            ingredients: [
                "Rolled Oats",
                "Almond Milk",
                "Banana Slices",
                "Organic Honey",
                "Almonds",
                "Cinnamon",
            ],
            image:
                "https://c.ndtvimg.com/gws/ms/-Winter-Breakfast/assets/9.jpeg?1705743102",
        },
        {
            name: "Chicken & Avocado Salad",
            price: 130,
            category: "Salads",
            description:
                "A protein-packed salad with grilled chicken, creamy avocado, and a light lemon dressing.",
            mealDetails:
                "A low-carb, high-protein meal perfect for muscle recovery.",
            ingredients: [
                "Grilled Chicken Breast",
                "Ripe Avocado",
                "Cherry Tomatoes",
                "Mixed Greens",
                "Olive Oil",
                "Lemon Juice",
                "Black Pepper & Sea Salt",
            ],
            image:
                "https://img.freepik.com/free-photo/top-view-healthy-diet-salad-with-grilled-chicken-broccoli-cauliflower-tomato-lettuce-avocado-lettuce_141793-2439.jpg?t=st=1741297279~exp=1741300879~hmac=a5a0404267818cf127f2e9e9ec042b4ecf975732a1fb3ac2965de5bd0f44e6ab&w=740",
        },
        {
            name: "Steak with Sweet Potatoes",
            price: 120,
            category: "Dinner",
            description:
                "A lean steak paired with roasted sweet potatoes and steamed vegetables.",
            mealDetails:
                "A high-protein, nutrient-dense meal for fitness enthusiasts.",
            ingredients: [
                "Steak (Lean Cut)",
                "Olive Oil",
                "Garlic",
                "Lemon Juice",
                "Rosemary",
                "Black Pepper & Sea Salt",
                "Sweet Potatoes",
                "Steamed Broccoli",
                "Cherry Tomatoes",
            ],
            image:
                "https://www.themealdb.com/images/media/meals/vussxq1511882648.jpg",
        },
        {
            name: "Green Detox Juice",
            price: 170,
            category: "Drinks",
            description:
                "A revitalizing green juice made with kale, cucumber, and lemon.",
            mealDetails:
                "A hydrating, detoxifying drink packed with vitamins and minerals.",
            ingredients: [
                "Kale",
                "Cucumber",
                "Lemon Juice",
                "Ginger",
                "Green Apple",
                "Celery",
                "Water",
            ],
            image:
                "https://www.watermelon.org/wp-content/uploads/2017/07/super-green-detox-smoothie-scaled.jpg",
        },
        {
            name: "Garlic Shrimp with Quinoa",
            price: 170,
            category: "Lunch",
            description:
                "Juicy shrimp sautéed in garlic butter, served with fluffy quinoa.",
            mealDetails:
                "A high-protein, low-carb meal ideal for weight management.",
            ingredients: [
                "Shrimp",
                "Quinoa",
                "Garlic",
                "Olive Oil",
                "Lemon Juice",
                "Black Pepper & Sea Salt",
                "Parsley",
            ],
            image: "https://www.themealdb.com/images/media/meals/1529445434.jpg",
        },
        {
            name: "Egg and Veggie Scramble",
            price: 175,
            category: "Breakfast",
            description:
                "A protein-packed scramble with eggs, spinach, tomatoes, and bell peppers.",
            mealDetails: "A nutritious breakfast rich in protein and vitamins.",
            ingredients: [
                "Eggs",
                "Spinach",
                "Tomatoes (Diced)",
                "Bell Peppers (Diced)",
                "Olive Oil",
                "Black Pepper & Sea Salt",
            ],
            image: "https://www.themealdb.com/images/media/meals/1550440197.jpg",
        },
        {
            name: "Turkey and Avocado Wrap",
            price: 110,
            category: "Lunch",
            description:
                "A healthy wrap filled with lean turkey, avocado, and fresh veggies.",
            mealDetails:
                "A balanced meal perfect for a quick and nutritious lunch.",
            ingredients: [
                "Turkey Breast (Sliced)",
                "Avocado (Sliced)",
                "Whole-Wheat Tortilla",
                "Lettuce",
                "Tomato (Sliced)",
                "Olive Oil",
                "Black Pepper & Sea Salt",
            ],
            image:
                "https://www.tasteslovely.com/wp-content/uploads/2016/02/California-Turkey-Club-Wrap-a-delicious-lunch-3.jpg",
        },
        {
            name: "Grilled Shrimp Tacos",
            price: 130,
            category: "Dinner",
            description:
                "Light and flavorful tacos with grilled shrimp, cabbage slaw, and lime.",
            mealDetails: "A low-calorie, high-protein dinner option.",
            ingredients: [
                "Shrimp (Grilled)",
                "Corn Tortillas",
                "Cabbage (Shredded)",
                "Cilantro",
                "Lime Juice",
                "Olive Oil",
                "Black Pepper & Sea Salt",
            ],
            image:
                "https://www.onceuponachef.com/images/2012/05/Grilled-Shrimp-Tacos-1-scaled.jpg",
        },
        {
            name: "Kale Caesar Salad",
            price: 195,
            category: "Salads",
            description:
                "A twist on the classic Caesar salad with nutrient-packed kale.",
            mealDetails: "A vitamin-rich salad with a creamy, light dressing.",
            ingredients: [
                "Kale (Chopped)",
                "Croutons",
                "Parmesan Cheese (Shaved)",
                "Caesar Dressing (Light)",
                "Grilled Chicken (Optional)",
            ],
            image:
                "https://www.crowdedkitchen.com/wp-content/uploads/2019/03/Kale-tahini-caesar-salad_-15.jpg",
        },
        {
            name: "Green Detox Smoothie",
            price: 165,
            category: "Drinks",
            description:
                "A refreshing and detoxifying smoothie with spinach, cucumber, and apple.",
            mealDetails:
                "A hydrating drink packed with vitamins and antioxidants.",
            ingredients: [
                "Spinach",
                "Cucumber",
                "Green Apple",
                "Lemon Juice",
                "Almond Milk",
                "Chia Seeds",
            ],
            image:
                "https://www.cubesnjuliennes.com/wp-content/uploads/2022/02/Green-Detox-Smoothie-Recipe.jpg",
        },
        {
            name: "Banana Oat Pancakes",
            price: 185,
            category: "Breakfast",
            description:
                "Healthy pancakes made with oats, banana, and a touch of honey.",
            mealDetails: "A gluten-free, fiber-rich breakfast option.",
            ingredients: [
                "Oats",
                "Banana (Mashed)",
                "Egg",
                "Almond Milk",
                "Honey",
                "Cinnamon",
            ],
            image:
                "https://bellyfull.net/wp-content/uploads/2021/09/Banana-oatmeal-pancakes-blog.jpg",
        },
        {
            name: "Chicken and Quinoa Bowl",
            price: 130,
            category: "Lunch",
            description:
                "A balanced bowl with grilled chicken, quinoa, and roasted veggies.",
            mealDetails:
                "A high-protein, nutrient-dense meal for a healthy lunch.",
            ingredients: [
                "Grilled Chicken Breast",
                "Quinoa (Cooked)",
                "Zucchini (Roasted)",
                "Bell Peppers (Roasted)",
                "Olive Oil",
                "Lemon Juice",
                "Black Pepper & Sea Salt",
            ],
            image:
                "https://www.slenderkitchen.com/sites/default/files/styles/gsd-4x3/public/recipe_images/chicken-quinoa-bowl.jpg",
        },
        {
            name: "Beef and Broccoli Stir-Fry",
            price: 170,
            category: "Dinner",
            description:
                "A classic stir-fry with tender beef, broccoli, and a savory sauce.",
            mealDetails: "A high-protein, low-carb dinner option.",
            ingredients: [
                "Beef Strips",
                "Broccoli",
                "Soy Sauce (Low-Sodium)",
                "Garlic (Minced)",
                "Ginger (Grated)",
                "Olive Oil",
                "Black Pepper & Sea Salt",
            ],
            image:
                "https://www.dinneratthezoo.com/wp-content/uploads/2017/10/beef-and-broccoli-stir-fry-14.jpg",
        },
        {
            name: "Watermelon Feta Salad",
            price: 190,
            category: "Salads",
            description:
                "A refreshing summer salad with watermelon, feta, and mint.",
            mealDetails: "A hydrating and light salad perfect for hot days.",
            ingredients: [
                "Watermelon (Cubed)",
                "Feta Cheese (Crumbled)",
                "Mint Leaves",
                "Olive Oil",
                "Balsamic Glaze",
            ],
            image:
                "https://www.cubesnjuliennes.com/wp-content/uploads/2021/03/Watermelon-Feta-Salad-Recipe.jpg",
        },
        {
            name: "Mango Lassi",
            price: 150,
            category: "Drinks",
            description:
                "A creamy and refreshing Indian drink made with mango and yogurt.",
            mealDetails: "A probiotic-rich drink that aids digestion.",
            ingredients: [
                "Mango (Ripe)",
                "Greek Yogurt",
                "Milk",
                "Honey",
                "Cardamom (Optional)",
            ],
            image:
                "https://shivanilovesfood.com/wp-content/uploads/2023/03/Healthy-Mango-Lassi-7.jpg",
        },
        {
            name: "Sweet Potato Toast",
            price: 120,
            category: "Breakfast",
            description:
                "A healthy alternative to bread, topped with avocado and seeds.",
            mealDetails: "A gluten-free, nutrient-dense breakfast option.",
            ingredients: [
                "Sweet Potato (Sliced)",
                "Avocado (Mashed)",
                "Chia Seeds",
                "Chili Flakes",
                "Lemon Juice",
            ],
            image:
                "https://wholefoodfor7.com/wp-content/uploads/2020/01/IMG_6152-e1724726031457.jpg",
        },
        {
            name: "Mediterranean Chickpea Salad",
            price: 175,
            category: "Salads",
            description:
                "A protein-packed salad with chickpeas, cucumbers, and feta.",
            mealDetails: "A flavorful and filling salad perfect for lunch.",
            ingredients: [
                "Chickpeas (Cooked)",
                "Cucumber (Diced)",
                "Tomatoes (Diced)",
                "Feta Cheese (Crumbled)",
                "Olive Oil",
                "Lemon Juice",
                "Black Pepper & Sea Salt",
            ],
            image:
                "https://frommybowl.com/wp-content/uploads/2021/08/Mediterranean_Chickpea_Salad_Vegan_GlutenFree_FromMyBowl-6-scaled.jpg",
        },
        {
            name: "Grilled Veggie Wrap",
            price: 185,
            category: "Lunch",
            description:
                "A flavorful wrap filled with grilled vegetables and hummus.",
            mealDetails: "A vegetarian-friendly meal packed with nutrients.",
            ingredients: [
                "Whole-Wheat Tortilla",
                "Zucchini (Grilled)",
                "Bell Peppers (Grilled)",
                "Eggplant (Grilled)",
                "Hummus",
                "Olive Oil",
                "Black Pepper & Sea Salt",
            ],
            image:
                "https://www.eatlivelove.ca/wp-content/uploads/2021/11/AdobeStock_361423504-scaled-e1679426985746.jpeg",
        },
        {
            name: "Baked Salmon with Quinoa",
            price: 160,
            category: "Dinner",
            description:
                "A wholesome dinner with baked salmon and a side of quinoa.",
            mealDetails:
                "A high-protein, omega-3-rich meal for a healthy dinner.",
            ingredients: [
                "Salmon Fillet",
                "Quinoa (Cooked)",
                "Lemon Slices",
                "Dill",
                "Olive Oil",
                "Black Pepper & Sea Salt",
            ],
            image:
                "https://www.ourhappymess.com/wp-content/uploads/2023/04/Roasted-Salmon-Quinoa-Bowls-square.jpg",
        },
        {
            name: "Chia Pudding",
            price: 150,
            category: "Desserts",
            description:
                "A healthy and creamy dessert made with chia seeds and almond milk.",
            mealDetails: "A fiber-rich dessert that supports digestion.",
            ingredients: [
                "Chia Seeds",
                "Almond Milk",
                "Honey",
                "Vanilla Extract",
                "Fresh Berries",
            ],
            image:
                "https://plantbasedrdblog.com/wp-content/uploads/2024/06/strawberry-crumble-chia-pudding_feat.jpg",
        },
        {
            name: "Green Tea Latte",
            price: 125,
            category: "Drinks",
            description:
                "A soothing and antioxidant-rich latte made with matcha green tea.",
            mealDetails: "A calming drink that boosts metabolism.",
            ingredients: [
                "Matcha Powder",
                "Almond Milk",
                "Honey",
                "Vanilla Extract",
            ],
            image:
                "https://cdn.loveandlemons.com/wp-content/uploads/2023/06/iced-matcha-latte.jpg",
        },
        {
            name: "Tropical Smoothie",
            price: 180,
            category: "Drinks",
            description:
                "A tropical blend of mango, pineapple, and coconut milk.",
            mealDetails: "A refreshing and vitamin-packed drink.",
            ingredients: [
                "Mango (Ripe)",
                "Pineapple (Chunks)",
                "Coconut Milk",
                "Honey",
                "Ice Cubes",
            ],
            image:
                "https://bakerbynature.com/wp-content/uploads/2020/06/Tropical-Smoothie-223.jpg",
        },
        {
            name: "Iced Coffee with Almond Milk",
            price: 130,
            category: "Drinks",
            description:
                "A refreshing iced coffee made with almond milk and a touch of sweetness.",
            mealDetails: "A low-calorie, energizing drink.",
            ingredients: [
                "Cold Brew Coffee",
                "Almond Milk",
                "Honey",
                "Ice Cubes",
            ],
            image:
                "https://www.almonds.com/sites/default/files/2020-05/almond_milk_cold_brew_01%5B1%5D5.jpg",
        },
        {
            name: "Fruit Salad with Honey Lime Dressing",
            price: 125,
            category: "Desserts",
            description:
                "A refreshing fruit salad with a zesty honey-lime dressing.",
            mealDetails: "A light and vitamin-rich dessert.",
            ingredients: [
                "Mixed Fruits (Strawberries, Blueberries, Kiwi, Mango)",
                "Honey",
                "Lime Juice",
                "Mint Leaves",
            ],
            image:
                "https://www.modernhoney.com/wp-content/uploads/2023/05/Fruit-Salad-10.jpg",
        },
        {
            name: "Baked Apples with Cinnamon",
            price: 150,
            category: "Desserts",
            description:
                "Warm and comforting baked apples with a hint of cinnamon.",
            mealDetails: "A healthy dessert that satisfies sweet cravings.",
            ingredients: [
                "Apples (Cored)",
                "Cinnamon",
                "Honey",
                "Walnuts (Chopped)",
                "Raisins",
            ],
            image:
                "https://www.whattheforkfoodblog.com/wp-content/uploads/2020/10/Cinnamon-Caramel-Baked-Apples-12-web.jpg",
        },
    ];
    try {
        const mealsCollection = collection(db, "meals");
        mealsData.forEach(async (meal) => {
            await addDoc(mealsCollection, meal);
        })
        console.log("Meals uploaded successfully!");
    } catch (error) {
        console.log("Error :( ", error);
    }
}

// uploadData()