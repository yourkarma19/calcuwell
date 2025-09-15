
import type { Calculator } from "@/lib/types";

// This file is separate to avoid bloating the initial bundle of pages
// that don't need the full calculator list immediately.

export const calculatorsData: Omit<Calculator, "component">[] = [
  // New VAT/GST Calculator
  {
    slug: "vat-gst-calculator",
    name: "VAT / GST Calculator",
    description: "Easily add or remove sales tax from a price to see the net or gross amount.",
    category: "Finance",
    iconName: "Tag",
    seoTitle: "GST Calculator India | Add & Remove Tax | CalcPro",
    metaDescription:
      "A fast and free GST calculator for India. Easily add tax to a net price or find the pre-tax amount from a gross price. Useful for calculating GST on restaurant bills.",
    formula: "Gross Price = Net Price * (1 + Tax Rate/100)",
    lastUpdated: "2024-07-31",
    tags: ["vat calculator", "gst calculator", "sales tax calculator", "add gst", "remove gst", "how is gst calculated on a restaurant bill", "how to calculate the final price after GST is added", "find the original price of an item before the discount"],
  },
  // New SIP Calculator
  {
    slug: "sip-calculator",
    name: "SIP Calculator",
    description:
      "Project the future value of your Systematic Investment Plan to visualize wealth growth.",
    category: "Finance",
    iconName: "TrendingUp",
    seoTitle: "SIP Calculator for Indian Investors | CalcPro",
    metaDescription:
      "Estimate the future value of your SIP investments for a specific goal (e.g., 1 crore in 15 years). Enter your monthly investment and expected return rate.",
    formula: "FV = P × ({[1 + i]^n - 1} / i) × (1 + i)",
    lastUpdated: "2024-07-31",
    tags: ["sip calculator", "investment calculator", "mutual fund", "systematic investment plan", "lumpsum vs sip", "will i become a crorepati", "sip calculator for a 1 crore goal", "sip vs lumpsum investment calculator", "sip calculator with inflation adjustment in India", "sip calculator for a child's education", "how to calculate SIP returns with examples", "SIP calculator for a 15-year goal of 1 crore", "investment calculator with monthly contributions", "investment goal calculator", "savings goal calculator"],
  },
  // New CGPA Calculator
  {
    slug: "cgpa-calculator",
    name: "CGPA Calculator",
    description:
      "Calculate your Cumulative Grade Point Average based on your semester-wise SGPA and credits.",
    category: "Education",
    iconName: "GraduationCap",
    seoTitle: "CGPA to Percentage Calculator | SGPA to CGPA | CalcPro",
    metaDescription:
      "Accurately calculate your CGPA by entering your semester GPAs (SGPA) and credits. Also helps convert CGPA to percentage for college admissions (e.g., for CBSE, GTU).",
    formula: "CGPA = Σ(Creditsᵢ * SGPAᵢ) / Σ(Total Creditsᵢ)",
    lastUpdated: "2024-07-31",
    tags: ["cgpa calculator", "sgpa to cgpa", "gpa to percentage", "education", "how to convert cgpa to percentage", "gtu spi to percentage", "how to convert CGPA to percentage for CBSE board for college admission", "GTU SPI to percentage conversion calculator", "convert CGPA to percentage for engineering students in India", "grade percentage to gpa converter"],
  },
  // New Net Calorie Calculator
  {
    slug: "net-calorie-calculator",
    name: "Net Calorie Calculator",
    description: "Track your daily energy balance by finding if you are in a calorie surplus or deficit.",
    category: "Health",
    iconName: "Flame",
    seoTitle: "Net Calorie Calculator for Weight Loss | CalcPro",
    metaDescription:
      "Find your daily energy balance. Our Net Calorie Calculator shows if you're in a calorie deficit, surplus, or at maintenance for your weight goals.",
    formula: "Net Calories = Calories Consumed - Calories Burned",
    lastUpdated: "2024-07-31",
    tags: ["net calorie calculator", "calorie deficit calculator", "safe calorie deficit for weight loss", "what is my calorie deficit", "how to calculate calorie deficit", "calorie surplus", "weight loss", "tdee", "daily calorie intake calculator for weight loss for an indian diet", "maintenance calorie calculator"],
  },
  // New Time Card Calculator
  {
    slug: "time-card-calculator",
    name: "Time Card Calculator",
    description:
      "A simple tool to calculate total work hours and gross pay for a week, including unpaid breaks.",
    category: "Finance",
    iconName: "Clock",
    seoTitle: "Weekly Time Card & Work Hours Calculator with Breaks | CalcPro",
    metaDescription:
      "Calculate weekly work hours & gross pay. Enter start/end times & breaks to get an accurate time card summary. Also calculates time duration for work.",
    formula: "Total Hours = Sum(End Time - Start Time - Break Time)",
    lastUpdated: "2024-07-31",
    tags: ["time card calculator", "work hours calculator", "payroll", "gross pay", "time duration calculator", "take home salary calculator after pf and income tax", "time duration calculator for work hours with a lunch break", "paycheck calculator"],
  },
  // New Concrete Slab Calculator
  {
    slug: "concrete-slab-calculator",
    name: "Concrete Slab Calculator",
    description:
      "Estimate the volume and number of pre-mixed concrete bags for slabs, footers, or round posts.",
    category: "Geometry & Engineering",
    iconName: "Calculator",
    seoTitle: "Concrete Volume & Bag Calculator | CalcPro",
    metaDescription:
      "Estimate the volume & number of concrete bags for your project. Works for slabs, footers, & round post holes. Also useful for construction cost estimation.",
    formula: "Volume = Length × Width × Thickness",
    lastUpdated: "2024-07-31",
    tags: ["concrete calculator", "volume calculator", "construction", "diy", "calculate the construction cost for a 1000 sq ft house in india", "for a construction project", "calculate the water capacity of an overhead tank in liters"],
  },
  // New Wind Chill Calculator
  {
    slug: "wind-chill-calculator",
    name: "Wind Chill Calculator",
    description: "Quickly determine the 'feels like' temperature based on air temperature and wind speed.",
    category: "Miscellaneous",
    iconName: "Wind",
    seoTitle: "Wind Chill 'Feels Like' Temperature Calculator | CalcPro",
    metaDescription:
      "Calculate wind chill temperature based on air temp & wind speed. Find out how cold it really feels & understand the risk of frostbite.",
    formula:
      "Wind Chill (F) = 35.74 + 0.6215T - 35.75(V^0.16) + 0.4275T(V^0.16)",
    lastUpdated: "2024-07-31",
    tags: ["wind chill", "feels like temperature", "weather", "safety"],
  },
  // New Cubic Equation Calculator
  {
    slug: "cubic-equation-calculator",
    name: "Cubic Equation Calculator",
    description:
      "Solve any cubic equation of the form ax³+bx²+cx+d=0 for all real and complex roots.",
    category: "Math",
    iconName: "Sigma",
    formula: "ax³ + bx² + cx + d = 0",
    seoTitle: "Cubic Equation Solver with All Roots | CalcPro",
    metaDescription:
      "Solve any cubic equation instantly. Our calculator finds all real & complex roots & shows the steps using the cubic formula. Free & accurate.",
    lastUpdated: "2024-07-31",
    tags: ["cubic equation calculator", "biquadratic equation calculator", "quartic equation calculator", "algebra calculator", "polynomial solver", "math problem solver", "roots calculator", "zeros of a function calculator"],
  },
  // New Triangle Angle Calculator
  {
    slug: "triangle-angle-calculator",
    name: "Triangle Angle Calculator",
    description:
      "Find the missing angles of a triangle when you know three sides (SSS) or two sides and an included angle (SAS).",
    category: "Geometry & Engineering",
    iconName: "Triangle",
    formula: "Law of Cosines & Law of Sines",
    seoTitle: "Triangle Angle Finder (SSS, SAS) | CalcPro",
    metaDescription:
      "Calculate unknown angles in any triangle. Enter side lengths (SSS) or sides and an angle (SAS) to find missing values using the Law of Sines & Cosines.",
    lastUpdated: "2024-07-31",
    tags: ["triangle angle calculator", "law of sines", "law of cosines", "geometry calculator", "find the angles of a triangle given the length of three sides", "solve a triangle with three given sides (SSS)", "calculate the interior angles of a triangle given the side ratios", "find the missing angle in a quadrilateral", "calculate the sum of the interior angles of a polygon", "trig calculator", "triangle calculator", "triangle side calculator", "special right triangles calculator", "30 60 90 triangle calculator", "45 45 90 triangle calculator"],
  },
  // New Tangent Line Calculator
  {
    slug: "tangent-line-calculator",
    name: "Tangent Line Calculator",
    description:
      "A calculus tool to find the equation of a line tangent to a function at a given point.",
    category: "Math",
    iconName: "Sigma",
    formula: "y - f(a) = f'(a)(x - a)",
    seoTitle: "Tangent Line Equation Calculator with Steps | CalcPro",
    metaDescription:
      "Find the tangent line equation for any function at a given point. Our free calculus calculator provides the full, step-by-step solution.",
    lastUpdated: "2024-07-31",
    tags: ["tangent line", "calculus calculator", "derivative calculator", "differentiation calculator", "integral calculator", "integration calculator", "definite integral calculator", "indefinite integral calculator", "limit calculator", "math with steps", "find the equation of the tangent line at a specific point", "find the equation of the normal line to a curve", "how to find the tangent plane to a surface", "series calculator", "taylor series calculator", "laplace transform calculator", "inverse laplace transform calculator", "fourier series calculator", "newton raphson calculator"],
  },
  // New Fraction to Percentage Calculator
  {
    slug: "fraction-to-percentage-calculator",
    name: "Fraction to Percentage Calculator",
    description: "Quickly convert any fraction into its equivalent percentage value with one click.",
    category: "Conversions",
    iconName: "Percent",
    formula: "(Numerator / Denominator) * 100",
    seoTitle: "Fraction to Percentage Converter Tool | CalcPro",
    metaDescription:
      "Quickly convert any fraction to a percentage with our free online tool. Shows you the calculation steps and the final answer instantly.",
    lastUpdated: "2024-07-31",
    tags: ["fraction to percentage", "math converter", "percentage calculator", "fraction to decimal to percentage conversion chart and calculator", "fraction to percent calculator"],
  },
  // New Intercept Calculator
  {
    slug: "intercept-calculator",
    name: "X and Y Intercept Calculator",
    description:
      "Find the x-intercept and y-intercept of a linear equation with step-by-step explanations.",
    category: "Math",
    iconName: "Sigma",
    seoTitle: "X and Y Intercept Finder with Steps | CalcPro",
    metaDescription:
      "A free calculator to find the x and y-intercepts of a line from any equation form. Get instant results & see step-by-step calculations.",
    formula: "Set x=0 for y-intercept, set y=0 for x-intercept",
    lastUpdated: "2024-07-31",
    tags: ["intercept calculator", "linear equation", "algebra", "slope intercept form", "find the x and y intercepts of a linear equation", "slope calculator", "distance formula calculator", "midpoint formula calculator", "coordinate geometry calculator"],
  },
  // New Decimal to Inches Calculator
  {
    slug: "decimal-to-inches-calculator",
    name: "Decimal to Inches Fraction Calculator",
    description:
      "Convert a decimal value into inches and a simplified fraction for precise measurements.",
    category: "Conversions",
    iconName: "Ruler",
    seoTitle: "Decimal to Inches Fraction Converter (cm to inches) | CalcPro",
    metaDescription:
      'Convert any decimal value into inches and a usable fraction (e.g., 1/8", 1/16"). Perfect for woodworking, machining, and engineering. Also works as a cm to inches converter.',
    lastUpdated: "2024-07-31",
    tags: ["decimal to inches", "measurement converter", "fraction calculator", "cm to inches", "how to convert a mixed number into a decimal"],
  },
  // New Feet and Inches Calculator
  {
    slug: "feet-and-inches-calculator",
    name: "Feet and Inches Calculator",
    description: "Perform arithmetic on imperial length measurements (add, subtract, multiply, or divide).",
    category: "Conversions",
    iconName: "Ruler",
    seoTitle: "Feet and Inches Arithmetic Calculator | CalcPro",
    metaDescription:
      "An online calculator to add, subtract, multiply, & divide feet and inches. Perfect for construction & DIY projects. Get instant results.",
    lastUpdated: "2024-07-31",
    tags: ["feet and inches", "imperial calculator", "length converter", "construction math", "height converter cm to feet and inches"],
  },
  // New Voltage to Watts Calculator
  {
    slug: "voltage-to-watts-calculator",
    name: "Voltage to Watts Calculator",
    description: "Easily convert voltage (V) and current (Amps) to electrical power in watts (W).",
    category: "Geometry & Engineering",
    iconName: "Atom",
    formula: "Power (P) = Voltage (V) × Current (I)",
    seoTitle: "Voltage to Watts (Amps to Watts) Converter | CalcPro",
    metaDescription:
      "Instantly convert Volts & Amps to Watts using our free online calculator. Understand the power formula (P=VI) with examples and explanations.",
    lastUpdated: "2024-07-31",
    tags: ["volts to watts", "ohms law", "power calculator", "electrical engineering"],
  },
  // New Partial Fraction Calculator
  {
    slug: "partial-fraction-calculator",
    name: "Partial Fraction Calculator",
    description: "Break down complex rational functions into a sum of simpler, more manageable fractions.",
    category: "Math",
    iconName: "Sigma",
    formula: "f(x) = P(x) / Q(x)",
    seoTitle: "Partial Fraction Decomposition Calculator with Steps | CalcPro",
    metaDescription:
      "Solve partial fraction decomposition problems instantly. Our free online calculator provides a detailed solution for your calculus homework.",
    lastUpdated: "2024-07-31",
    tags: ["partial fractions", "partial fraction decomposition calculator", "calculus calculator", "algebra", "math problem solver", "integral calculator using partial fraction decomposition", "partial fraction decomposition for an integral"],
  },

  // Lifestyle
  {
    slug: "wedding-budget-calculator",
    name: "Wedding Budget Calculator",
    description: "Plan your wedding finances by estimating costs for the venue, catering, decor, and more.",
    category: "Lifestyle",
    iconName: "Heart",
    seoTitle: "Wedding Budget Planner & Cost Estimator | CalcPro",
    metaDescription:
      "Plan your dream wedding with our free budget calculator. Estimate costs for the venue, catering, and photography to stay on budget.",
    formula: "Total = Venue + (Catering × Guests) + Photography + Dress + ...",
    lastUpdated: "2024-07-31",
    tags: ["wedding budget", "cost estimator", "wedding planning", "child's marriage planning calculator india"]
  },
  {
    slug: "pet-age-calculator",
    name: "Pet Age Calculator",
    description: "Translate your dog or cat's age into the equivalent human years to understand their life stage.",
    category: "Lifestyle",
    iconName: "Dog",
    seoTitle: "Pet Age to Human Years Calculator (Dog & Cat) | CalcPro",
    metaDescription:
      "How old is your pet in human years? Use our pet age calculator to convert your dog or cat's age into an equivalent human age.",
    lastUpdated: "2024-07-31",
    tags: ["pet age", "dog years", "cat years", "human years", "dog age calculator", "cat age calculator", "pet age calculator", "horse age calculator", "cat age in human years"]
  },
  {
    slug: "pet-care-cost-calculator",
    name: "Pet Care Cost Calculator",
    description: "Estimate the monthly and yearly costs of owning a pet, including food, vet visits, and grooming.",
    category: "Lifestyle",
    iconName: "Dog",
    seoTitle: "Annual Pet Care Cost Estimator | CalcPro",
    metaDescription:
      "Estimate the annual and monthly costs of pet ownership. Our calculator helps you budget for food, vet care, grooming, and other expenses.",
    lastUpdated: "2024-07-31",
    tags: ["pet cost", "dog ownership cost", "cat ownership cost", "pet budget"]
  },
  {
    slug: "credit-card-payoff-calculator",
    name: "Credit Card Payoff Calculator",
    description: "Find out how long it will take to pay off your credit card balance and the total interest cost.",
    category: "Finance",
    iconName: "CreditCard",
    seoTitle: "Credit Card Payoff & Debt Calculator | CalcPro",
    metaDescription:
      "Find out how long it will take to pay off your credit card balance. See your payoff schedule & total interest paid based on your payments.",
    formula: "N = -log(1 - (B*r)/P) / log(1+r)",
    lastUpdated: "2024-07-31",
    tags: ["credit card calculator", "credit card payoff", "credit card payoff calculator", "debt calculator", "interest calculator", "finance", "credit card balance transfer calculator", "credit card debt snowball vs avalanche calculator", "how to pay off debt faster", "debt consolidation loan calculator", "payday loan calculator", "debt payoff calculator", "debt snowball calculator", "debt avalanche calculator", "line of credit payoff calculator", "credit card interest calculator", "credit card minimum payment calculator", "budget calculator", "payment calculator"],
  },

  // Math & Logic
  {
    slug: "basic-calculator",
    name: "Basic Calculator",
    description: "A simple and fast online calculator for all your basic arithmetic needs.",
    category: "Math",
    iconName: "Calculator",
    seoTitle: "Free Online Basic & Scientific Calculator | CalcPro",
    metaDescription:
      "A simple and fast online calculator for everyday arithmetic. Perform addition, subtraction, multiplication, and division with ease.",
    lastUpdated: "2024-07-31",
    tags: [
      "online calculator", "free calculator", "web calculator", "internet calculator", "digital calculator", 
      "online calculation tool", "free online calculators", "simple calculator online", "basic calculator online", 
      "easy calculator online", "all in one calculator", "online math calculator", "website with calculators", 
      "best online calculator", "calculator website", "free web based calculator", "online calculator with memory", 
      "mobile friendly calculator", "online calculator for chromebook", "online calculator for tablet", 
      "calculator app online", "virtual calculator", "computer calculator online", "standard calculator online", 
      "everyday calculator", "quick calculator online", "online problem solver", "calculation website", 
      "free scientific calculator online", 
      "order of operations (BODMAS/PEMDAS) calculator", "scientific calculator", "online scientific calculator", 
      "graphing calculator", "online graphing calculator", "scientific calculator with fractions", 
      "scientific calculator with degrees", "scientific calculator with graph", "adding machine calculator", 
      "online calculator with tape", "calculator with memory functions", "pi button on calculator", "big number calculator",
      "calculator for website", "embeddable calculator", "free calculator widget", "html calculator code",
      "add calculator to my website", "interactive calculator builder", "website calculator plugin",
      "javascript calculator for website", "custom calculator for website", "online calculator for blog",
      "embed calculator wordpress", "embed calculator shopify", "free calculator widget for website",
      "how to create a calculator for my website", "interactive calculator for lead generation",
      "quote calculator for website", "price calculator for website", "savings calculator widget",
      "mortgage calculator widget free", "bmi calculator for website", "loan calculator html code",
      "online calculator builder", "no code calculator builder", "customizable calculator widget",
      "free interactive calculator", "calculator API", "math calculator widget", "financial calculator widget",
      "health calculator for website", "create a custom online calculator"
    ],
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Our easy-to-use Percentage Calculator helps you solve all your percentage problems.",
    category: "Math",
    iconName: "Percent",
    seoTitle: "Online Percentage Calculator (Increase/Decrease/Marks) | CalcPro",
    metaDescription:
      "Easily calculate percentages. Find the percentage of a number, percent increase/decrease, or calculate percentage of marks for exams.",
    lastUpdated: "2024-07-31",
    tags: ["percentage calculator", "percent calculator", "percent change", "what is x percent of y", "how to calculate percentage of marks", "how to calculate percentage of marks obtained in all subjects", "what is the formula to calculate percentage increase between two numbers", "percentage difference calculator for comparing two values", "online percentage calculator with steps for homework", "how to calculate reverse percentage to find the original price", "percentage of a number calculator for word problems", "percentage difference vs percentage error calculator", "percentage increase calculator", "percentage decrease calculator", "percentage change calculator", "what is x percent of y calculator", "x is what percent of y calculator"],
  },
  {
    slug: "fraction-calculator",
    name: "Fraction Calculator",
    description: "A simple tool to add, subtract, multiply, and divide proper and improper fractions.",
    category: "Math",
    iconName: "Pi",
    seoTitle: "Fraction Calculator (+, -, ×, ÷) with Steps | CalcPro",
    metaDescription:
      "Our free fraction calculator makes math easy. Add, subtract, multiply, and divide proper and improper fractions with step-by-step results.",
    lastUpdated: "2024-07-31",
    tags: ["fraction calculator", "simplify fractions", "math problem solver", "add and subtract fractions with different denominators calculator", "simplify fractions with large numbers step-by-step", "how to divide fractions by a whole number calculator", "compare fractions with unlike denominators calculator", "fraction to decimal calculator", "decimal to fraction calculator", "add fractions calculator", "subtract fractions calculator", "multiply fractions calculator", "divide fractions calculator", "simplify fractions calculator"],
  },
  {
    slug: "mixed-number-calculator",
    name: "Mixed Number Calculator",
    description: "A simple calculator to handle arithmetic with mixed numbers (whole numbers and fractions).",
    category: "Math",
    iconName: "Pi",
    seoTitle: "Mixed Number Calculator & Converter to Improper Fraction | CalcPro",
    metaDescription:
      "A simple calculator for adding, subtracting, multiplying, and dividing mixed numbers. Also converts mixed numbers to improper fractions with steps.",
    lastUpdated: "2024-07-31",
    tags: ["mixed number calculator", "improper fraction", "fraction math", "mixed number to improper fraction calculator with steps", "how to convert a repeating decimal to a fraction calculator", "mixed fraction to improper fraction calculator", "improper fraction to mixed fraction calculator"],
  },
  {
    slug: "ratio-calculator",
    name: "Ratio Calculator",
    description: "Simplify ratios and find the missing value in a proportion with this easy-to-use tool.",
    category: "Math",
    iconName: "Scale",
    seoTitle: "Ratio Simplifier & Proportion Calculator | CalcPro",
    metaDescription:
      "Use our online ratio calculator to simplify ratios and find missing values in a proportion. Fast, easy, and perfect for scaling recipes or drawings.",
    lastUpdated: "2024-07-31",
    tags: ["ratio calculator", "simplify ratio", "proportion calculator", "ratio calculator for scaling a recipe or down", "ratio calculator to scale a recipe or drawing", "simplify ratio calculator"],
  },
  {
    slug: "proportion-calculator",
    name: "Proportion Calculator",
    description: "Quickly solve for the missing value in a proportion (A/B = C/D) using cross-multiplication.",
    category: "Math",
    iconName: "Variable",
    seoTitle: "Online Proportion Calculator (Solve for X) | CalcPro",
    metaDescription:
      "An easy-to-use proportion calculator to help you solve for the missing value 'x' in a proportion using cross-multiplication. Includes examples.",
    lastUpdated: "2024-07-31",
    tags: ["proportion calculator", "solve for x", "ratio", "math helper", "how to solve for x in a proportion equation", "solve word problems involving ratios and proportions"],
  },
  {
    slug: "mean-median-mode-calculator",
    name: "Mean/Median/Mode Calculator",
    description: "Quickly find the mean, median, mode, and range of any numerical data set.",
    category: "Math",
    iconName: "Sigma",
    seoTitle: "Mean, Median, Mode & Range Calculator for Datasets | CalcPro",
    metaDescription:
      "Quickly find the mean, median, mode, and range of any data set. Our calculator helps you understand the central tendency of your data.",
    lastUpdated: "2024-07-31",
    tags: ["mean median mode", "statistics calculator", "average calculator", "what is the difference between mean and median", "find the mean of a set of numbers", "calculate the range of a set of data points", "mean, median, and mode calculator for grouped data", "how to find the five-number summary (min, Q1, median, Q3, max)", "rounding calculator", "round to the nearest tenth calculator", "quartile calculator", "interquartile range calculator", "iqr calculator", "range calculator statistics", "data set statistics calculator", "frequency distribution calculator"],
  },
  {
    slug: "standard-deviation-calculator",
    name: "Standard Deviation Calculator",
    description: "Measure the spread and consistency of your data by calculating the standard deviation.",
    category: "Math",
    iconName: "Sigma",
    seoTitle: "Standard Deviation Calculator (Sample & Population) | CalcPro",
    metaDescription:
      "Calculate the standard deviation for a sample or population data set. Understand the difference and the spread of your data with our tool.",
    lastUpdated: "2024-07-31",
    tags: ["standard deviation calculator", "variance calculator", "statistics calculator", "how to calculate standard deviation for sample vs population", "what is the difference between sample and population standard deviation", "standard deviation calculator for grouped data or a frequency table", "variance calculator", "coefficient of variation calculator", "r-squared calculator", "standard error calculator", "grouped data standard deviation calculator"],
  },
  {
    slug: "probability-calculator",
    name: "Probability Calculator",
    description: "Calculate the probability of single and multiple independent events with our easy tool.",
    category: "Math",
    iconName: "Beaker",
    seoTitle: "Probability Calculator for Single & Multiple Events | CalcPro",
    metaDescription:
      "Calculate the probability of single and multiple independent events with our easy-to-use tool. Finds P(A and B) and P(A or B).",
    lastUpdated: "2024-07-31",
    tags: ["probability calculator", "statistics calculator", "chance", "probability of A or B happening calculator", "calculate the probability of two independent events both happening", "find the probability of a single event happening", "calculate the probability of mutually exclusive events", "coin flip probability calculator", "dice roll probability calculator", "lottery odds calculator", "poker odds calculator", "bayes theorem calculator"],
  },
  {
    slug: "permutation-combination-calculator",
    name: "Permutation & Combination",
    description: "Determine the number of permutations (nPr) and combinations (nCr) from a set.",
    category: "Math",
    iconName: "Sigma",
    seoTitle: "Permutation (nPr) & Combination (nCr) Calculator | CalcPro",
    metaDescription:
      "Calculate permutations (nPr) and combinations (nCr) quickly. Understand when order matters in probability with examples and formulas.",
    lastUpdated: "2024-07-31",
    tags: ["permutation calculator", "combination calculator", "ncr", "npr", "difference between combinations and permutations with examples", "find the number of permutations for a word", "how many combinations are possible from a group", "calculate the number of combinations for a lottery ticket", "ncr calculator", "npr calculator"],
  },
  {
    slug: "factorial-calculator",
    name: "Factorial Calculator",
    description: "Find the factorial (n!) of any non-negative integer, essential for probability and combinatorics.",
    category: "Math",
    iconName: "Variable",
    formula: "n!",
    seoTitle: "Factorial Calculator (n!) for Large Numbers | CalcPro",
    metaDescription:
      "Our online factorial calculator finds the factorial (n!) of any non-negative integer. Includes the formula and an explanation of 0!.",
    lastUpdated: "2024-07-31",
    tags: ["factorial calculator", "n!", "combinatorics", "math", "factorial of a number calculator for n!", "long division calculator", "long multiplication calculator", "modulo calculator", "remainder calculator", "significant figures calculator", "sig fig calculator", "order of operations calculator", "pemdas calculator"],
  },
  {
    slug: "lcm-gcd-calculator",
    name: "LCM & GCD Calculator",
    description: "Find the Least Common Multiple (LCM) and Greatest Common Divisor (GCD) of a set of numbers.",
    category: "Math",
    iconName: "Variable",
    seoTitle: "LCM & GCF (GCD) Finder for Multiple Numbers | CalcPro",
    metaDescription:
      "Easily calculate the Least Common Multiple (LCM) and Greatest Common Divisor (GCD/GCF) of a set of numbers. A tool for number theory.",
    lastUpdated: "2024-07-31",
    tags: ["lcm calculator", "gcd calculator", "gcf calculator", "greatest common factor calculator", "least common multiple", "greatest common factor of 3 or more numbers", "least common multiple for a set of numbers", "greatest common factor of 3 numbers calculator", "least common denominator calculator", "lcd calculator", "prime factorization calculator", "is it a prime number calculator"],
  },
  {
    slug: "square-root-cube-root-calculator",
    name: "Square/Cube Root Calculator",
    description: "A simple calculator to find the square root and cube root of any positive or negative number.",
    category: "Math",
    iconName: "Variable",
    seoTitle: "Square Root & Cube Root Finder (Positive & Negative) | CalcPro",
    metaDescription:
      "A simple calculator to find the square root and cube root of any number. Handles both positive and negative inputs, including non-perfect squares.",
    lastUpdated: "2024-07-31",
    tags: ["square root calculator", "cube root", "math", "algebra", "find the square root of a non-perfect square", "cube root calculator for negative numbers", "roots calculator"],
  },
  {
    slug: "exponent-power-calculator",
    name: "Exponent & Power Calculator",
    description: "Quickly calculate the result of a base raised to any power, including negative and fractional exponents.",
    category: "Math",
    iconName: "Variable",
    seoTitle: "Exponent & Power Calculator (x^y) | CalcPro",
    metaDescription:
      "Quickly calculate the result of a base raised to a power. Handles positive, negative, integer, and fractional exponents with ease.",
    lastUpdated: "2024-07-31",
    tags: ["exponent calculator", "power calculator", "math", "algebra", "calculate powers and exponents for large numbers", "what is a number raised to the power of zero", "solve for the base in an exponential equation", "what are the rules for adding and subtracting exponents", "how to solve an equation with a negative exponent", "simplifying expressions with fractional exponents"],
  },
  {
    slug: "logarithm-calculator",
    name: "Logarithm Calculator",
    description: "Solve for the logarithm of any number with any base, including natural logs (ln).",
    category: "Math",
    iconName: "Variable",
    seoTitle: "Logarithm (Log & ln) Calculator with Any Base | CalcPro",
    metaDescription:
      "An easy-to-use log calculator. Solve for the logarithm of any number with any base, including common logs (base 10) and natural logs (ln).",
    lastUpdated: "2024-07-31",
    tags: ["logarithm calculator", "log calculator", "natural log calculator", "antilog calculator", "exponential equation calculator", "difference between log (base 10) and ln (natural log)", "logarithm calculator for a base other than 10 or e", "change of base formula for logarithms with examples", "expand a logarithmic expression using log properties", "condense a logarithmic expression into a single logarithm"],
  },
  {
    slug: "equation-solver",
    name: "Equation Solver",
    description: "Solve linear (ax+b=c) and quadratic (ax²+bx+c=0) equations instantly.",
    category: "Math",
    iconName: "Variable",
    seoTitle: "Equation Solver (Linear & Quadratic) with Steps | CalcPro",
    metaDescription:
      "Solve linear (ax+b=c) and quadratic (ax²+bx+c=0) equations instantly. Our online tool provides the solution(s) and the formulas used.",
    lastUpdated: "2024-07-31",
    tags: ["equation solver", "linear equation calculator", "quadratic equation calculator", "quadratic formula calculator", "solve for x calculator", "algebra calculator", "algebra solver", "math problem solver", "equation solver with steps", "math solver with steps", "pre algebra calculator", "solve an equation with variables on both sides", "how to solve a quadratic equation that cannot be factored", "solve linear equations with variables on both sides", "completing the square calculator", "polynomial calculator", "factoring calculator", "factoring polynomials calculator", "foil method calculator", "system of equations calculator", "inequality calculator", "absolute value calculator", "radical equation calculator", "rational equation calculator", "function calculator", "domain and range calculator"],
  },
  {
    slug: "matrix-calculator",
    name: "Matrix Calculator",
    description: "A simple matrix calculator for performing addition and subtraction on 2x2 matrices.",
    category: "Math",
    iconName: "Pi",
    seoTitle: "2x2 Matrix Addition & Subtraction Calculator | CalcPro",
    metaDescription:
      "A simple matrix calculator for performing addition and subtraction on 2x2 matrices. Enter the matrix values to get an instant result.",
    lastUpdated: "2024-07-31",
    tags: ["matrix calculator", "linear algebra", "math", "multiply two matrices of 3x3 size", "find the determinant of a 3x3 matrix", "matrix determinant calculator", "matrix inverse calculator", "find the inverse of a 2x2 matrix", "what is an identity matrix and its properties", "solve a system of equations using Cramer's rule", "find the transpose of a matrix", "solve a matrix equation using the inverse matrix", "eigenvalue calculator", "eigenvector calculator", "cross product calculator", "dot product calculator"],
  },
  {
    slug: "complex-number-calculator",
    name: "Complex Number Calculator",
    description: "Add, subtract, multiply, and divide complex numbers in the form a + bi and get instant results.",
    category: "Math",
    iconName: "Variable",
    seoTitle: "Complex Number Arithmetic Calculator | CalcPro",
    metaDescription:
      "Perform arithmetic on complex numbers. Add, subtract, multiply, and divide complex numbers in the form a + bi and get instant results.",
    lastUpdated: "2024-07-31",
    tags: ["complex numbers", "imaginary number calculator", "algebra", "math", "engineering math", "add, subtract, multiply, and divide complex numbers", "simplifying complex numbers calculator", "find the modulus and argument of a complex number", "convert a complex number to polar form"],
  },
  {
    slug: "roman-numeral-converter",
    name: "Roman Numeral Converter",
    description: "Translate numbers to Roman numerals and back for values between 1 and 3,999.",
    category: "Conversions",
    iconName: "ArrowRightLeft",
    seoTitle: "Roman Numeral Date & Number Converter | CalcPro",
    metaDescription:
      "A fast and accurate Roman numeral converter. Translate numbers to Roman numerals and back for values between 1 and 3,999.",
    lastUpdated: "2024-07-31",
    tags: ["roman numerals", "converter", "history", "convert Roman numerals to numbers for a history project", "roman numeral converter", "numbers to words converter"],
  },

  // Finance & Money
  {
    slug: "loan-emi-calculator",
    name: "Loan EMI Calculator",
    description: "Calculate your loan EMI and see how extra payments can reduce your loan tenure and save you money.",
    category: "Finance",
    iconName: "Landmark",
    seoTitle: "Loan EMI Calculator with Prepayment Options (Home, Car) | CalcPro",
    formula: "P * r * (1+r)^n / ((1+r)^n - 1)",
    metaDescription:
      "Calculate your loan EMI and see how extra payments can reduce your loan tenure and save you money. For home, car, or personal loans in India.",
    lastUpdated: "2024-07-31",
    tags: ["loan calculator", "emi calculator", "loan emi calculator", "personal loan calculator", "loan amortization schedule", "amortization calculator", "loan payment calculator", "monthly loan payment calculator", "simple loan calculator", "free loan calculator online", "loan interest calculator", "loan calculator with extra payments", "what will my loan payment be", "how to calculate emi for home loan", "loan repayment calculator", "loan term calculator", "how long to pay off loan calculator", "loan balance calculator", "personal loan calculator for good credit", "what if I pay an extra 100 on my mortgage", "loan principal and interest calculator", "loan to value calculator ltv", "loan amortization calculator with extra payments", "loan amortization table generator"],
  },
  {
    slug: "loan-comparison-calculator",
    name: "Loan Comparison Calculator",
    description: "Compare two loan offers side-by-side to find the most cost-effective option for you.",
    category: "Finance",
    iconName: "Scale",
    seoTitle: "Side-by-Side Loan Comparison Calculator | CalcPro",
    metaDescription:
      "Compare two loans instantly. Our calculator shows the EMI and total cost side-by-side to help you choose the cheapest option.",
    lastUpdated: "2024-07-31",
    tags: ["loan comparison calculator", "emi comparison", "which loan is better", "home loan comparison", "car loan comparison", "personal loan rates", "loan balance transfer calculator for a home loan", "refinance calculator"],
  },
  {
    slug: "mortgage-calculator",
    name: "Mortgage Calculator",
    description: "Estimate your monthly mortgage payment, including principal, interest, taxes, and insurance (PITI).",
    category: "Finance",
    iconName: "House",
    seoTitle: "Mortgage Calculator with PITI & Amortization | CalcPro",
    formula: "P * r * (1+r)^n / ((1+r)^n - 1)",
    metaDescription:
      "Estimate your monthly mortgage payment, including principal, interest, taxes, and insurance (PITI). Plan your home budget with our calculator.",
    lastUpdated: "2024-07-31",
    tags: ["mortgage calculator", "home loan calculator", "mortgage payment calculator", "piti calculator", "mortgage calculator with taxes and insurance", "calculate monthly mortgage payment", "what is my mortgage payment with taxes and insurance", "india home loan emi calculator", "home loan eligibility calculator", "mortgage payoff calculator", "early mortgage payoff calculator", "mortgage refinance calculator", "30-year fixed mortgage calculator", "15-year fixed mortgage calculator", "adjustable-rate mortgage calculator", "arm calculator", "bi-weekly mortgage payment calculator", "mortgage renewal calculator", "california mortgage calculator", "texas mortgage calculator", "florida mortgage calculator", "new york mortgage calculator", "canada mortgage calculator", "uk mortgage calculator", "australia home loan calculator", "home equity loan calculator", "heloc calculator", "construction loan calculator", "land loan calculator", "commercial real estate loan calculator", "fha loan calculator", "va mortgage calculator", "usda loan calculator", "jumbo loan calculator", "interest only loan calculator", "bridge loan calculator", "hard money loan calculator", "vacation home mortgage calculator", "cash out refinance calculator", "mortgage points calculator", "down payment calculator", "how much down payment for a house", "reverse mortgage calculator"],
  },
  {
    slug: "car-loan-calculator",
    name: "Car Loan EMI Calculator",
    description: "Calculate your monthly car loan payment (EMI) and understand the total cost of your auto loan.",
    category: "Finance",
    iconName: "Car",
    seoTitle: "Car Loan EMI & Payment Calculator India | CalcPro",
    formula: "P * r * (1+r)^n / ((1+r)^n - 1)",
    metaDescription:
      "Calculate your monthly car loan payment (EMI) and total cost. Our calculator helps you understand your auto loan before you buy. For new and used cars.",
    lastUpdated: "2024-07-31",
    tags: ["car loan calculator", "auto loan calculator", "car loan payment calculator", "car finance calculator", "used car loan calculator", "new car loan calculator", "bad credit car loan calculator", "motorcycle loan calculator", "boat loan calculator", "rv loan calculator", "emi calculator", "car loan emi calculator with down payment for a new car", "student loan calculator"],
  },
  {
    slug: "simple-interest-calculator",
    name: "Simple Interest Calculator",
    description: "Quickly calculate simple interest on your loans or investments using the standard SI formula.",
    category: "Finance",
    iconName: "PiggyBank",
    formula: "P * R * T / 100",
    seoTitle: "Simple Interest Calculator (Formula P*R*T) | CalcPro",
    metaDescription:
      "Quickly calculate simple interest on your loans or investments. Our free calculator uses the standard SI formula and explains how it works.",
    lastUpdated: "2024-07-31",
    tags: ["simple interest", "interest calculator", "simple interest calculator", "investment calculator", "loan interest", "simple interest vs compound interest for a 5-year investment", "daily simple interest calculator"],
  },
  {
    slug: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    description: "See how your savings can grow with our calculator that projects your investment growth over time.",
    category: "Finance",
    iconName: "PiggyBank",
    formula: "A = P(1 + r/n)^(nt)",
    seoTitle: "Compound Interest Investment Calculator | CalcPro",
    metaDescription:
      "See how your savings can grow with compound interest. Our calculator projects your investment growth over time with monthly or yearly additions.",
    lastUpdated: "2024-07-31",
    tags: ["compound interest", "compound interest calculator", "investment growth", "savings calculator", "future value", "compound interest calculator with yearly or monthly additions", "daily compound interest calculator", "compound interest calculator monthly", "compound interest formula calculator"],
  },
  {
    slug: "savings-calculator",
    name: "Savings Calculator",
    description: "Project the future value of your savings based on deposits, contributions, and interest rates.",
    category: "Finance",
    iconName: "PiggyBank",
    seoTitle: "Savings Goal & Growth Projection Calculator | CalcPro",
    metaDescription:
      "Project the future value of your savings with our easy calculator. See how deposits, contributions, and interest rates impact your growth.",
    lastUpdated: "2024-07-31",
    tags: ["savings calculator", "investment calculator", "future value calculator", "fv calculator", "what will my investment be worth calculator", "investment goal calculator", "savings goal calculator", "college savings calculator", "529 plan calculator", "financial planning", "annuity calculator", "annuity payout calculator"],
  },
  {
    slug: "retirement-calculator",
    name: "Retirement Calculator",
    description: "Estimate how much you need to save to meet your long-term retirement goals.",
    category: "Finance",
    iconName: "PiggyBank",
    seoTitle: "Retirement Planning Calculator for India | CalcPro",
    metaDescription:
      "Plan for your future with our retirement calculator. Estimate how much you need to save to meet your retirement goals and see if you are on track.",
    lastUpdated: "2024-07-31",
    tags: ["retirement calculator", "pension calculator", "nps calculator", "401k calculator", "ira calculator", "roth ira calculator", "retirement planning calculator for a 30-year-old in india", "National Pension System (NPS) final corpus calculator", "emergency fund calculator for 6 months of expenses", "when can I retire", "retirement forecaster", "retirement savings calculator", "how much do I need to retire calculator", "early retirement calculator", "4 percent rule calculator", "retirement withdrawal calculator", "401k contribution calculator", "ira contribution calculator", "roth ira conversion calculator", "retirement income calculator", "millionaire calculator", "financial independence calculator", "fire calculator", "taxable vs tax-deferred investment calculator", "social security calculator", "rmd calculator", "required minimum distribution calculator", "401k loan calculator", "ira withdrawal calculator", "roth ira income limits calculator", "sep ira calculator", "simple ira calculator", "tsp calculator", "403b calculator", "defined benefit plan calculator", "retirement calculator by age", "retirement calculator for couples", "social security benefit estimator", "how long will my money last in retirement calculator", "best retirement planning tools", "free retirement planning tools"],
  },
  {
    slug: "investment-return-calculator",
    name: "Investment Return (ROI) Calculator",
    description: "Calculate the net profit and Return on Investment (ROI) percentage for any investment.",
    category: "Finance",
    iconName: "AreaChart",
    seoTitle: "Return on Investment (ROI) Profit Calculator | CalcPro",
    metaDescription:
      "Calculate the Return on Investment (ROI) for any investment. Enter your initial and final values to find the net profit and ROI percentage.",
    lastUpdated: "2024-07-31",
    tags: ["roi calculator", "investment return calculator", "return on investment calculator", "profit calculator", "investment calculator", "mutual fund calculator", "etf calculator", "cd calculator", "certificate of deposit calculator", "bond calculator", "real estate investment calculator", "rental property roi calculator", "investment property cash flow calculator", "cap rate calculator", "house flipping calculator", "brrrr method calculator", "cap rate calculator", "net worth calculator", "investment fee calculator", "robo-advisor fee calculator", "financial advisor value calculator", "investment risk tolerance calculator", "compound annual growth rate calculator", "cagr calculator"],
  },
  {
    slug: "stock-profit-loss-calculator",
    name: "Stock Profit/Loss Calculator",
    description: "Determine the profit or loss from stock trades, including commissions, to find your true ROI.",
    category: "Finance",
    iconName: "AreaChart",
    seoTitle: "Stock Profit & Loss ROI Calculator with Commission | CalcPro",
    metaDescription:
      "Determine the profit or loss from your stock trades. Factor in buy/sell prices and commissions to find your true Return on Investment (ROI). Also calculates capital gains.",
    lastUpdated: "2024-07-31",
    tags: ["stock calculator", "stock profit calculator", "roi calculator", "profit loss", "stock market calculator", "capital gains tax calculator", "calculate the capital gains tax on my stock market investments", "stock average calculator", "day trading profit calculator", "dividend reinvestment calculator", "drip calculator", "stock average down calculator", "cryptocurrency investment calculator", "bitcoin profit calculator"],
  },
  {
    slug: "currency-converter",
    name: "Currency Converter",
    description: "A simple currency converter for mock exchange rates between major world currencies.",
    category: "Finance",
    iconName: "Globe",
    seoTitle: "Currency & Foreign Exchange Rate Converter | CalcPro",
    metaDescription:
      "A simple currency converter for mock exchange rates. Convert between major world currencies like USD, EUR, JPY, GBP, INR, and more.",
    lastUpdated: "2024-07-31",
    tags: ["currency converter", "exchange rate calculator", "currency exchange", "live currency converter", "usd to eur converter", "eur to usd converter", "gbp to usd converter", "usd to gbp converter", "usd to jpy converter", "usd to cad converter", "cad to usd converter", "usd to aud converter", "usd to inr converter", "inr to usd converter", "forex calculator", "money converter", "dollar to euro converter", "pound to dollar converter", "historical exchange rates", "currency converter with bank fee", "mastercard currency converter", "visa exchange rate calculator", "paypal currency converter"],
  },
  {
    slug: "inflation-calculator",
    name: "Inflation Calculator",
    description: "Use our inflation calculator to see how the purchasing power of money has changed over time.",
    category: "Finance",
    iconName: "Banknote",
    seoTitle: "Historical Inflation & Purchasing Power Calculator India | CalcPro",
    metaDescription:
      "Use our inflation calculator for India to see how the purchasing power of money has changed over time. Calculate inflation-adjusted returns on your investments.",
    lastUpdated: "2024-07-31",
    tags: ["inflation calculator", "inflation calculator india", "purchasing power calculator", "cpi calculator", "inflation-adjusted return on my fixed deposit", "real vs nominal value", "cost of living calculator", "inflation calculator for investments", "real rate of return calculator", "inflation rate calculator"],
  },
  {
    slug: "tip-calculator",
    name: "Tip Calculator",
    description: "A quick and easy tool to calculate tips and split the bill between any number of people.",
    category: "Finance",
    iconName: "Wallet",
    seoTitle: "Tip Calculator & Bill Splitter App | CalcPro",
    metaDescription:
      "A quick and easy tip calculator. Determine the tip amount for any bill and split the total cost among any number of people.",
    lastUpdated: "2024-07-31",
    tags: ["tip calculator", "split the bill", "split the bill calculator", "restaurant bill", "gratuity calculator", "split a bill with a tip calculator for a group of friends", "checkbook balance calculator"],
  },
  {
    slug: "discount-calculator",
    name: "Discount Calculator",
    description: "Easily calculate the final price after a percentage discount to see how much you will save.",
    category: "Finance",
    iconName: "Tag",
    seoTitle: "Discount & Sale Price Off Calculator | CalcPro",
    metaDescription:
      "Easily calculate the final price after a discount. Enter the original price & discount percentage to find out how much you will pay and save.",
    lastUpdated: "2024-07-31",
    tags: ["discount calculator", "sale price", "percentage off", "final price calculator", "find the original price of an item before the discount", "calculate the discount percentage on a product during a sale", "markup calculator"],
  },
  {
    slug: "salary-calculator",
    name: "Salary Calculator",
    description: "Estimate your take-home pay by entering your gross salary and tax/deduction rates.",
    category: "Finance",
    iconName: "Briefcase",
    seoTitle: "Take-Home Salary Calculator India (after PF & Tax) | CalcPro",
    metaDescription:
      "Estimate your take-home pay in India. Enter your gross salary and see the breakdown after PF, ESI, and income tax deductions.",
    lastUpdated: "2024-07-31",
    tags: ["salary calculator india", "take home salary calculator", "income tax calculator", "salary slip breakdown calculator India", "take home salary calculator after PF and income tax", "income tax calculation for the new vs old regime for my salary", "HRA exemption calculation for an employee living in a metro city", "paycheck calculator", "hourly to salary calculator", "salary to hourly calculator", "tax bracket calculator", "payroll calculator", "gross to net salary calculator", "after tax salary calculator", "paycheck tax calculator", "w4 withholding calculator", "tax refund calculator", "self-employment tax calculator", "property tax calculator", "bonus tax calculator", "marginal tax rate calculator", "effective tax rate calculator", "california income tax calculator", "new york tax calculator", "texas salary calculator", "uk tax calculator", "canada income tax calculator", "australia tax calculator", "gst calculator", "paycheck calculator hourly", "bi-weekly paycheck calculator", "salary calculator with overtime", "commission calculator", "freelance rate calculator", "consultant rate calculator", "side hustle tax calculator", "1099 tax calculator", "itemized deduction vs standard deduction calculator", "child tax credit calculator", "earned income tax credit calculator", "social security tax calculator", "medicare tax calculator", "fica tax calculator", "unemployment benefits calculator", "salary comparison calculator", "cost of living calculator", "salary increase calculator", "pay raise calculator", "401k contribution calculator paycheck", "hsa contribution calculator"],
  },
  {
    slug: "overtime-pay-calculator",
    name: "Overtime Pay Calculator",
    description: "Calculate your total weekly earnings including regular hours and overtime at any multiplier.",
    category: "Finance",
    iconName: "Clock",
    seoTitle: "Overtime Pay Rate Calculator | CalcPro",
    metaDescription:
      "Calculate your total pay including overtime. Enter your hourly rate, regular hours, and OT multiplier to see your complete weekly earnings.",
    lastUpdated: "2024-07-31",
    tags: ["overtime calculator", "hourly pay", "payroll", "time and a half", "double time pay"],
  },
  {
    slug: "break-even-point-calculator",
    name: "Break-even Point Calculator",
    description: "Find the number of units you need to sell to cover your costs and start making a profit.",
    category: "Finance",
    iconName: "Briefcase",
    seoTitle: "Business Break-Even Point Analysis Calculator | CalcPro",
    metaDescription:
      "Determine the break-even point for your business. Enter fixed costs, variable costs, & price per unit to find how many units you need to sell.",
    lastUpdated: "2024-07-31",
    tags: ["break even point", "break even point calculator", "business calculator", "cost analysis", "for small business owners", "contribution margin", "margin calculator", "financial ratio calculator", "working capital calculator", "business loan calculator", "sba loan calculator", "equipment financing calculator"],
  },
  {
    slug: "business-profit-margin-calculator",
    name: "Profit Margin Calculator",
    description: "Calculate gross, operating, and net profit margins to understand your business's profitability.",
    category: "Finance",
    iconName: "Briefcase",
    seoTitle: "Business Gross & Net Profit Margin Calculator | CalcPro",
    metaDescription:
      "Calculate the gross, operating, and net profit margins for your business. Understand your profitability with this easy financial tool.",
    lastUpdated: "2024-07-31",
    tags: ["profit margin", "business finance", "profitability ratios", "gross margin", "net profit margin"],
  },
  {
    slug: "loan-affordability-calculator",
    name: "Loan Affordability Calculator",
    description: "Estimate how much you can afford to borrow based on your income, debts, and desired loan terms.",
    category: "Finance",
    iconName: "Landmark",
    seoTitle: "How Much Loan Can I Afford Calculator (Based on Salary) | CalcPro",
    metaDescription:
      "Estimate how much you can afford to borrow based on your salary, monthly debts, and desired loan terms. For home or car loan planning.",
    lastUpdated: "2024-07-31",
    tags: ["loan affordability", "how much can i borrow", "dti ratio", "loan affordability calculator based on my salary", "debt-to-income ratio", "debt to income ratio calculator", "house affordability calculator", "how much house can I afford calculator", "mortgage qualification calculator", "maximum loan amount calculator", "home affordability calculator based on income"],
  },

  // Health & Fitness
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index to assess if your weight is healthy for your height.",
    category: "Health",
    iconName: "HeartPulse",
    seoTitle: "BMI Calculator for Indian Adults (Metric & Imperial) | CalcPro",
    formula: "weight (kg) / (height (m) * height (m))",
    metaDescription:
      "Calculate your Body Mass Index (BMI) to assess your weight status for Indian adults. Our calculator uses the standard formula and provides WHO categories.",
    lastUpdated: "2024-07-31",
    tags: ["bmi calculator", "body mass index", "body mass index calculator", "bmi calculator for men", "bmi calculator for women", "bmi calculator for child", "teen bmi calculator", "adult bmi calculator", "bmi chart", "what is my bmi", "is my bmi healthy", "bmi calculator kg cm", "bmi calculator lbs inches", "who bmi classification", "cdc bmi calculator for child and teen", "underweight bmi calculator", "overweight bmi calculator", "obesity class calculator", "body fat vs bmi", "body mass index calculator for Indian adults"],
  },
  {
    slug: "bmr-calculator",
    name: "BMR Calculator",
    description: "Find out the number of calories your body needs to function at complete rest.",
    category: "Health",
    iconName: "Scale",
    seoTitle: "Accurate BMR Calculator (Mifflin-St Jeor) | CalcPro",
    formula:
      "Mifflin-St Jeor: 10*weight(kg) + 6.25*height(cm) - 5*age + (gender==='male' ? 5 : -161)",
    metaDescription:
      "Calculate your Basal Metabolic Rate (BMR) to find out the number of calories your body needs at rest. Uses the Mifflin-St Jeor equation.",
    lastUpdated: "2024-07-31",
    tags: ["bmr calculator", "metabolism", "calorie needs", "tdee", "basal metabolic rate", "basal metabolic rate calculator", "bmr calculator harris-benedict", "bmr calculator mifflin st jeor", "total daily energy expenditure calculator", "tdee calculator", "maintenance calorie calculator"]
  },
  {
    slug: "calorie-needs-calculator",
    name: "Daily Calorie Calculator",
    description: "Get a personalized daily calorie target based on your lifestyle for weight management.",
    category: "Health",
    iconName: "HeartPulse",
    seoTitle: "Daily Calories Calculator for Weight Loss India | CalcPro",
    metaDescription:
      "Free Indian calorie calculator for weight loss. Get a personalized daily calorie target & learn how to achieve it with an Indian diet.",
    lastUpdated: "2024-07-31",
    tags: [
      "calorie calculator india", "weight loss diet", "indian diet plan", "macro nutrient calculator for a vegetarian indian diet", "daily calorie intake calculator for weight loss for an Indian diet",
      "calorie calculator", "calorie counter", "macro calculator", "macronutrient calculator", "calorie deficit calculator", "weight loss calculator", "keto macro calculator",
      "protein calculator", "carbohydrate calculator", "fat calculator", "daily calorie needs calculator", "calorie calculator for weight loss", "calorie calculator for weight gain", 
      "calorie calculator to maintain weight", "how many calories should I eat", "weight loss target date calculator", "macros for weight loss calculator", 
      "macros for muscle gain calculator", "keto calculator", "ketogenic diet calculator", "net carbs calculator", "low carb macro calculator", "paleo macro calculator", 
      "iifym calculator", "if it fits your macros calculator", "protein intake calculator", "protein calculator for bodybuilding", "daily protein requirement calculator", 
      "body weight planner", "diet calculator", "nutrition calculator", "food macro calculator", "recipe nutrition calculator", "intermittent fasting calculator", 
      "fasting window calculator", "omad calculator", "one meal a day calculator", "carb cycling calculator", "refeed day calculator", "bulking calculator",
      "cutting calculator", "e-liquid calculator", "diy e-juice calculator", "caffeine calculator", "alcohol calorie calculator", "sugar intake calculator", "fiber calculator", 
      "sodium calculator", "points calculator for diet", "food points calculator", "weight loss percentage calculator",
      "bmr and tdee calculator", "activity level for tdee calculator", "sedentary calorie calculator", "lightly active calorie calculator", "moderately active calorie calculator", 
      "very active calorie calculator", "extra active calorie calculator", "calorie tracker online", "free macro tracker", "keto diet food list calculator"
    ],
  },
  {
    slug: "ideal-weight-calculator",
    name: "Ideal Weight Calculator",
    description: "Determine a healthy weight range for your height and gender using the Robinson formula.",
    category: "Health",
    iconName: "Scale",
    formula: "Robinson Formula (1983)",
    seoTitle: "Ideal Body Weight Calculator (Robinson Formula) | CalcPro",
    metaDescription:
      "Determine your ideal body weight based on height and gender using the Robinson formula. A useful tool for setting fitness goals.",
    lastUpdated: "2024-07-31",
    tags: ["ideal weight calculator", "healthy weight calculator", "fitness goals", "ideal weight calculator for women", "ideal weight calculator for men", "hamwi formula ideal body weight", "devine formula ideal body weight", "robinson formula ideal body weight", "miller formula ideal body weight", "what should I weigh calculator", "body surface area calculator", "bsa calculator"]
  },
  {
    slug: "body-fat-percentage-calculator",
    name: "Body Fat Percentage Calculator",
    description: "Estimate your body fat percentage using the U.S. Navy tape measure method.",
    category: "Health",
    iconName: "Percent",
    formula: "U.S. Navy Method",
    seoTitle: "Body Fat Percentage Estimator (US Navy) | CalcPro",
    metaDescription:
      "Estimate your body fat percentage using the U.S. Navy method with a tape measure. A more accurate assessment of health than BMI alone.",
    lastUpdated: "2024-07-31",
    tags: ["body fat percentage calculator", "body fat calculator", "fitness assessment", "body composition calculator", "army body fat calculator", "navy body fat calculator", "body fat calculator with tape measure", "skinfold caliper body fat calculator", "3-site skinfold calculator", "7-site skinfold calculator", "jackson pollock body fat formula", "durnin womersley body fat calculator", "body fat calculator with pictures", "estimate body fat percentage", "accurate body fat calculator"]
  },
  {
    slug: "lean-body-mass-calculator",
    name: "Lean Body Mass Calculator",
    description: "Estimate your lean body mass (fat-free mass) using the Boer formula.",
    category: "Health",
    iconName: "Bone",
    seoTitle: "Lean Body Mass (LBM) & Fat-Free Mass Calc | CalcPro",
    metaDescription:
      "Estimate your lean body mass (LBM) using the Boer formula. LBM represents the weight of your body minus fat, including muscle and bone.",
    lastUpdated: "2024-07-31",
    tags: ["lean body mass calculator", "lbm calculator", "body composition", "lean body mass formula", "fat free mass index calculator ffmi"]
  },
  {
    slug: "waist-to-hip-ratio-calculator",
    name: "Waist-to-Hip Ratio Calculator",
    description: "Calculate your Waist-to-Hip Ratio to assess body fat distribution and potential health risks.",
    category: "Health",
    iconName: "Ruler",
    seoTitle: "Waist-to-Hip Ratio (WHR) Health Risk Calc | CalcPro",
    metaDescription:
      "Calculate your Waist-to-Hip Ratio (WHR) to assess your body fat distribution and potential health risks. Learn what your WHR means.",
    lastUpdated: "2024-07-31",
    tags: ["waist to hip ratio", "whr calculator", "body shape", "health risk", "how to measure waist for calculator", "weight category calculator"]
  },
  {
    slug: "pregnancy-due-date-calculator",
    name: "Pregnancy Due Date Calculator",
    description: "Estimate your baby's due date based on your last menstrual period (LMP) or conception date.",
    category: "Health",
    iconName: "Baby",
    formula: "Naegele's rule",
    seoTitle: "Pregnancy Due Date & Conception Calculator | CalcPro",
    metaDescription:
      "Get an estimated due date for your baby using your last menstrual period (LMP) or date of conception. Includes a week-by-week pregnancy calculator.",
    lastUpdated: "2024-07-31",
    tags: ["due date calculator", "pregnancy calculator", "conception calculator", "pregnancy week calculator", "estimated due date calculator", "edd calculator", "due date calculator by last period", "lmp calculator", "due date calculator by conception date", "due date calculator ivf", "ivf transfer date calculator", "pregnancy weight gain calculator", "pregnancy test calculator", "when to take a pregnancy test calculator", "hcg calculator", "beta hcg doubling calculator", "reverse due date calculator", "when did I conceive calculator", "how many weeks pregnant am I calculator", "trimester calculator", "fetal age calculator", "chinese gender predictor", "baby due date calculator", "pregnancy wheel online", "due date calculator for twins", "first trimester due date calculator", "ultrasound due date calculator", "what is my due date", "calculate my baby's due date", "implantation calculator", "breastfeeding calculator", "milk intake calculator for baby"],
  },
  {
    slug: "ovulation-calculator",
    name: "Ovulation Calculator",
    description: "Estimate your most fertile days and ovulation date based on your menstrual cycle.",
    category: "Health",
    iconName: "CalendarClock",
    seoTitle: "Ovulation & Fertile Window Prediction for Family Planning | CalcPro",
    metaDescription:
      "Estimate your fertile window and ovulation date based on your menstrual cycle. Our tool helps you predict your most fertile days for family planning.",
    lastUpdated: "2024-07-31",
    tags: ["ovulation calculator", "fertility calculator", "fertile window calculator", "ovulation predictor", "when am I most fertile calculator", "menstrual cycle calculator", "period calculator", "ovulation calendar", "safe period calculator", "pms calculator", "menopause calculator", "cycle length calculator"]
  },
  {
    slug: "water-intake-calculator",
    name: "Water Intake Calculator",
    description: "Get a personalized recommendation for your daily water intake based on age, weight, and activity.",
    category: "Health",
    iconName: "Droplets",
    seoTitle: "Daily Water Intake Needs Calculator | CalcPro",
    metaDescription:
      "Estimate your recommended daily water intake based on your age, weight, and activity level. Stay hydrated with our personalized calculator.",
    lastUpdated: "2024-07-31",
    tags: ["water intake calculator", "hydration calculator", "daily water needs", "water usage calculator for my household", "how much water should I drink calculator"]
  },
  {
    slug: "heart-rate-zone-calculator",
    name: "Heart Rate Zone Calculator",
    description: "Determine your target heart rate zones for fat burning, cardio, and peak performance exercise.",
    category: "Health",
    iconName: "HeartPulse",
    seoTitle: "Training & Target Heart Rate Zone Calculator | CalcPro",
    metaDescription:
      "Determine your target heart rate zones for exercise. Use our calculator to find your optimal zones for fat burning, cardio, and performance.",
    lastUpdated: "2024-07-31",
    tags: ["heart rate zone calculator", "target heart rate calculator", "fat burning zone", "cardio", "training pace calculator", "karvonen formula calculator", "pace calculator", "running pace calculator", "race pace calculator", "5k pace calculator", "10k pace calculator", "half marathon pace calculator", "marathon pace calculator", "cycling pace calculator", "swimming pace calculator", "triathlon pace calculator", "run pace calculator"],
  },
  {
    slug: "vo2-max-calculator",
    name: "VO₂ Max Calculator",
    description: "Get a non-exercise based estimate of your VO₂ max, a key indicator of cardiovascular fitness.",
    category: "Health",
    iconName: "Wind",
    seoTitle: "VO₂ Max Fitness Level Estimator | CalcPro",
    metaDescription:
      "Estimate your VO₂ max, a key indicator of your cardiovascular fitness. This non-exercise estimation is based on your resting heart rate.",
    lastUpdated: "2024-07-31",
    tags: ["vo2 max calculator", "fitness level", "cardio fitness", "age grade calculator running", "Cooper test calculator", "METs calculator", "metabolic equivalent of task calculator", "activity calorie burner", "how many calories did I burn", "calories burned calculator", "calories burned walking calculator", "calories burned running calculator", "calories burned cycling calculator", "calories burned swimming calculator", "calories burned lifting weights calculator", "exercise calorie calculator", "workout calorie calculator"],
  },
  {
    slug: "bac-calculator",
    name: "Blood Alcohol (BAC) Calculator",
    description: "Estimate your Blood Alcohol Content (BAC) using the Widmark formula for educational purposes.",
    category: "Health",
    iconName: "TestTube",
    seoTitle: "Blood Alcohol Content (BAC) Estimator | CalcPro",
    metaDescription:
      "Estimate your Blood Alcohol Content (BAC) using the Widmark formula. This calculator provides an educational estimate & is not for legal use.",
    lastUpdated: "2024-07-31",
    tags: ["bac calculator", "blood alcohol content", "widmark formula"]
  },

  // Conversions
  {
    slug: "unit-converter",
    name: "Unit Converter",
    description: "A versatile tool for converting length, weight, temperature, area, volume, and speed.",
    category: "Conversions",
    iconName: "Ruler",
    seoTitle: "Online Universal Unit Converter Tool | CalcPro",
    metaDescription:
      "A versatile unit converter for length, weight, temperature, area, volume, and speed. Fast and easy to use for various measurements.",
    lastUpdated: "2024-07-31",
    tags: ["unit converter", "measurement converter", "metric to imperial converter", "imperial to metric converter", "length converter", "weight converter", "mass converter", "temperature converter", "volume converter", "area converter", "speed converter", "pressure converter", "energy converter", "power converter", "force converter", "time converter", "angle converter", "fuel consumption converter", "distance converter", "cooking measurement converter", "clothing size converter", "shoe size converter", "ring size converter", "inches to cm converter", "cm to inches converter", "feet to meters converter", "meters to feet converter", "km to miles converter", "miles to km converter", "yards to meters converter", "kg to lbs converter", "lbs to kg converter", "grams to ounces converter", "ounces to grams converter", "stone to kg converter", "celsius to fahrenheit converter", "fahrenheit to celsius converter", "kelvin to celsius converter", "liters to gallons converter", "gallons to liters converter", "ml to oz converter", "oz to ml converter", "square feet to square meters converter", "acres to hectares converter", "mph to kph converter", "kph to mph converter", "knots to mph converter", "pascals to psi converter", "psi to pascals converter", "bar to psi converter", "joules to calories converter", "calories to joules converter", "watts to horsepower converter", "horsepower to watts converter", "newtons to pounds force converter", "mpg to l/100km converter", "metric conversion calculator", "height converter cm to feet and inches", "weight conversion chart", "temperature conversion formula", "cooking measurement converter", "cups to grams converter", "tablespoons to ml converter", "teaspoons to grams converter", "fluid ounce converter", "torque converter", "density converter", "flow rate converter", "acceleration converter", "frequency converter", "cooking conversion calculator", "baking converter", "recipe converter", "ingredient substitution calculator", "cups to grams flour converter", "cups to grams sugar converter", "ounces to cups converter", "pace converter running"],
  },
  {
    slug: "data-storage-converter",
    name: "Data Storage Converter",
    description: "Convert between various digital data storage units, from bits and bytes to petabytes.",
    category: "Conversions",
    iconName: "Database",
    seoTitle: "Data Storage Size Converter (KB, MB, GB, TB) | CalcPro",
    metaDescription:
      "Convert between digital data storage units, from bits and bytes to kilobytes (KB), megabytes (MB), gigabytes (GB), and terabytes (TB).",
    lastUpdated: "2024-07-31",
    tags: ["data storage converter", "kb to mb", "gb to mb", "file size converter", "mb to gb converter", "gb to tb converter", "kb to mb converter", "bits to bytes converter", "computer storage units conversion"],
  },
  {
    slug: "data-transfer-rate-converter",
    name: "Data Transfer Rate Converter",
    description: "Convert data transfer speeds, like megabits per second (Mbps) to megabytes per second (MB/s).",
    category: "Conversions",
    iconName: "Shuffle",
    seoTitle: "Data Transfer & Internet Speed Converter (Mbps to MB/s) | CalcPro",
    metaDescription:
      "Convert data transfer speeds, like megabits per second (Mbps) to megabytes per second (MB/s). For internet speed & file downloads.",
    lastUpdated: "2024-07-31",
    tags: ["data transfer rate converter", "mbps to mbs", "internet speed converter", "bandwidth converter", "mbps to MB/s converter"]
  },
  {
    slug: "time-converter",
    name: "Time Converter",
    description: "A simple and fast converter for various units of time, from seconds to years (approximate).",
    category: "Conversions",
    iconName: "Clock",
    seoTitle: "Time Measurement Unit Converter | CalcPro",
    metaDescription:
      "A simple and fast time converter for various units of time, including seconds, minutes, hours, days, weeks, and years (approximate).",
    lastUpdated: "2024-07-31",
    tags: ["time converter", "unit converter", "hours to minutes"]
  },
  {
    slug: "energy-converter",
    name: "Energy Converter",
    description: "Convert between different units of energy, such as Joules, calories, and kWh.",
    category: "Conversions",
    iconName: "Atom",
    seoTitle: "Energy Unit Conversion Calculator (J, cal, kWh) | CalcPro",
    metaDescription:
      "Convert between different units of energy, such as Joules, Kilojoules, calories, Kilocalories (kcal), and Kilowatt-hours (kWh).",
    lastUpdated: "2024-07-31",
    tags: ["energy converter", "joule to calorie", "kwh converter", "calories to joules converter"]
  },
  {
    slug: "pressure-converter",
    name: "Pressure Converter",
    description: "Convert between various units of pressure, including Pascal (Pa), bar, atmosphere (atm), and psi.",
    category: "Conversions",
    iconName: "Cloud",
    seoTitle: "Pressure Unit Converter (Pa, Bar, PSI) | CalcPro",
    metaDescription:
      "Convert between various units of pressure, including Pascal (Pa), Kilopascal (kPa), bar, atmosphere (atm), and psi.",
    lastUpdated: "2024-07-31",
    tags: ["pressure converter", "psi to bar", "pascal to atm", "pascals to psi converter", "psi to pascals converter", "bar to psi converter"]
  },
  {
    slug: "power-converter",
    name: "Power Converter",
    description: "A tool for converting between different units of power, such as watts (W), kilowatts (kW), and horsepower (hp).",
    category: "Conversions",
    iconName: "Wind",
    seoTitle: "Power Unit Converter (Watts, HP, kW) | CalcPro",
    metaDescription:
      "A tool for converting between different units of power, such as watts (W), kilowatts (kW), and horsepower (hp).",
    lastUpdated: "2024-07-31",
    tags: ["power converter", "watts to hp", "kw to watts", "watts to horsepower converter", "horsepower to watts converter"]
  },
  {
    slug: "angle-converter",
    name: "Angle Converter",
    description: "Quickly convert angles between degrees and radians for math, physics, and engineering.",
    category: "Conversions",
    iconName: "Ruler",
    seoTitle: "Angle Unit Converter (Degrees to Radians) | CalcPro",
    metaDescription:
      "Quickly convert angles between degrees and radians. An essential tool for students and professionals in math, physics, and engineering.",
    lastUpdated: "2024-07-31",
    tags: ["angle converter", "degrees to radians", "radians to degrees", "trigonometry", "convert an angle from radians to degrees and minutes", "convert degrees, minutes, and seconds to decimal degrees", "angle conversion calculator"],
  },
  {
    slug: "fuel-efficiency-converter",
    name: "Fuel Efficiency Converter",
    description: "Convert fuel efficiency units between Miles Per Gallon (MPG) and Liters per 100 kilometers (L/100km).",
    category: "Conversions",
    iconName: "Car",
    seoTitle: "Fuel Efficiency Converter (MPG to L/100km) | CalcPro",
    metaDescription:
      "Convert fuel efficiency units between Miles Per Gallon (MPG) and Liters per 100 kilometers (L/100km). Useful for comparing vehicles.",
    lastUpdated: "2024-07-31",
    tags: ["fuel efficiency converter", "mpg to l/100km", "mileage calculator", "car mileage calculator kmpl india", "fuel cost calculator for a road trip from Ahmedabad to Mumbai", "fuel consumption converter", "fuel economy converter", "gas mileage calculator"]
  },

  // Date & Time
  {
    slug: "age-calculator",
    name: "Age Calculator",
    description: "Find your exact age in years, months, and days with our easy-to-use online age calculator.",
    category: "Date & Time",
    iconName: "CalendarClock",
    seoTitle: "Exact Age Calculator in Years, Months, Days | CalcPro",
    formula: "Current Date - Date of Birth",
    metaDescription:
      "Find your exact age in years, months, weeks, and days with our online age calculator. Simply enter your date of birth to get your age.",
    lastUpdated: "2024-07-31",
    tags: ["age calculator", "date of birth calculator", "exact age calculator", "how old am I calculator", "chronological age calculator", "age calculator in years months days", "age calculator in days", "age calculator in hours", "age calculator in seconds", "birthday calculator", "how many days until my birthday", "next birthday calculator", "age calculator by date of birth", "korean age calculator", "how old will I be in 2050", "what year was I born if I am 30", "age finder", "calculate age from dob", "online age calculator", "free age calculator", "age calculator for job application", "retirement age calculator", "zodiac sign calculator", "chinese zodiac calculator", "generation calculator (boomer, gen x, millennial, gen z)", "how old was someone on a certain date", "historical age calculator", "celebrity age calculator", "age calculator app", "age calculator with time", "age as of today calculator", "leap year birthday age calculator", "age problems word problem solver"],
  },
  {
    slug: "date-difference-calculator",
    name: "Date Difference Calculator",
    description: "Calculate the exact number of years, months, weeks, & days between any two dates.",
    category: "Date & Time",
    iconName: "CalendarDays",
    formula: "endDate - startDate",
    seoTitle: "Date Difference & Days Between Dates Calculator | CalcPro",
    metaDescription:
      "Calculate the exact number of years, months, weeks, & days between any two dates. Perfect for finding the duration of projects and events.",
    lastUpdated: "2024-07-31",
    tags: ["date difference", "days between dates", "date calculator", "calculate the number of years, months, and days between two dates", "age difference calculator", "relationship duration calculator", "how long have we been together calculator", "anniversary calculator", "age calculator from date to date"],
  },
  {
    slug: "countdown-timer",
    name: "Countdown Timer",
    description: "Set a countdown to any date & time and track the days, hours, minutes, and seconds remaining.",
    category: "Date & Time",
    iconName: "Timer",
    seoTitle: "Online Countdown Clock & Timer to any Date | CalcPro",
    metaDescription:
      "Set a countdown to any date & time. Our online timer will track the days, hours, minutes, and seconds remaining until your event.",
    lastUpdated: "2024-07-31",
    tags: ["countdown timer", "online clock", "event timer"]
  },
  {
    slug: "time-zone-converter",
    name: "Time Zone Converter",
    description: "Easily convert the time between different time zones around the world.",
    category: "Date & Time",
    iconName: "Globe",
    seoTitle: "World Time Zone Converter & Time Difference | CalcPro",
    metaDescription:
      "Easily convert the time between different time zones around the world. Find the time difference between any two cities instantly.",
    lastUpdated: "2024-07-31",
    tags: ["time zone converter", "world clock", "time difference", "world clock converter", "gmt converter", "pst to est converter"]
  },
  {
    slug: "world-clock-calculator",
    name: "World Clock",
    description: "View the current local time in major cities across the globe to check time differences.",
    category: "Date & Time",
    iconName: "Globe",
    seoTitle: "World Clock for Major Cities with Time Zones | CalcPro",
    metaDescription:
      "View the current local time in major cities across the globe. Our world clock is an easy way to check time differences and plan calls.",
    lastUpdated: "2024-07-31",
    tags: ["world clock", "time zones", "local time"]
  },
  {
    slug: "working-days-calculator",
    name: "Working Days Calculator",
    description: "Calculate the number of working days (business days) between two dates, excluding weekends.",
    category: "Date & Time",
    iconName: "Briefcase",
    seoTitle: "Working & Business Days Counter (Excluding Weekends) | CalcPro",
    metaDescription:
      "Calculate the number of working days (business days) between two dates. This tool excludes Saturdays and Sundays to give you an accurate count.",
    lastUpdated: "2024-07-31",
    tags: ["working days calculator", "business days", "date calculator", "calculate working days between two dates excluding weekends and holidays"]
  },
  {
    slug: "week-number-calculator",
    name: "Week Number Calculator",
    description: "Quickly find the week number for any date using different standards, including ISO 8601.",
    category: "Date & Time",
    iconName: "CalendarDays",
    seoTitle: "Week of the Year Calculator (ISO 8601) | CalcPro",
    metaDescription:
      "Quickly find the week number for any date using different standards, including ISO 8601. An essential tool for weekly scheduling.",
    lastUpdated: "2024-07-31",
    tags: ["week number", "iso 8601", "weekly calendar"]
  },
  {
    slug: "add-subtract-days-calculator",
    name: "Add/Subtract Days Calculator",
    description: "Find a future or past date by adding or subtracting a specific number of days from a start date.",
    category: "Date & Time",
    iconName: "CalendarClock",
    seoTitle: "Add or Subtract Days from Date Calculator | CalcPro",
    metaDescription:
      "Find a future or past date by adding or subtracting days from a start date. Perfect for calculating deadlines, follow-ups, and events.",
    lastUpdated: "2024-07-31",
    tags: ["date calculator", "add days", "subtract days", "date math"]
  },
  {
    slug: "business-day-calculator",
    name: "Business Day Calculator",
    description: "Calculate a future date by adding or subtracting business days, automatically skipping weekends.",
    category: "Date & Time",
    iconName: "Briefcase",
    seoTitle: "Next Business Day & Date Calculator | CalcPro",
    metaDescription:
      "Calculate a future date by adding or subtracting business days, automatically skipping weekends to ensure accuracy for deadlines.",
    lastUpdated: "2024-07-31",
    tags: ["business day calculator", "working days", "date calculator"]
  },

  // Programming & Tech
  {
    slug: "binary-converter",
    name: "Binary & Number System Converter",
    description: "A versatile number system converter for binary, decimal, hexadecimal, and octal values.",
    category: "Programming",
    iconName: "Binary",
    formula: "parseInt(num, fromBase).toString(toBase)",
    seoTitle: "Binary, Hex, Octal & Decimal Converter | CalcPro",
    metaDescription:
      "A versatile number system converter for binary, decimal, hexadecimal, and octal values. For programmers and computer science students.",
    lastUpdated: "2024-07-31",
    tags: ["binary converter", "hex converter", "number system", "hexadecimal to decimal converter for programming", "convert a number from binary to decimal", "binary calculator", "hex calculator", "decimal converter", "octal converter", "number base converter", "binary to decimal converter", "decimal to binary converter", "hex to decimal converter", "decimal to hex converter", "binary to hex converter", "hex to binary converter", "text to binary converter", "binary to text converter", "ascii to binary converter", "ip address to binary converter", "hexadecimal converter", "scientific notation converter", "scientific notation to decimal converter", "decimal to scientific notation converter"],
  },
  {
    slug: "ascii-text-converter",
    name: "ASCII ↔ Text Converter",
    description: "A simple and instant tool to convert ASCII codes to text and text back to ASCII values.",
    category: "Programming",
    iconName: "ArrowRightLeft",
    seoTitle: "ASCII to Text / Text to ASCII Converter | CalcPro",
    metaDescription:
      "Easily convert ASCII codes to text characters and text to ASCII values. A simple and instant tool for developers working with encoding.",
    lastUpdated: "2024-07-31",
    tags: ["ascii converter", "text to ascii", "character code", "text to binary converter", "ascii to binary converter"]
  },
  {
    slug: "base64-converter",
    name: "Base64 Encoder/Decoder",
    description: "A free online tool to encode data to Base64 or decode a Base64 string back to its original format.",
    category: "Programming",
    iconName: "Binary",
    seoTitle: "Online Base64 Encoder & Decoder Tool | CalcPro",
    metaDescription:
      "A free online tool to encode your data to Base64 or decode a Base64 string back to its original format. Supports UTF-8 text.",
    lastUpdated: "2024-07-31",
    tags: ["base64 encode", "base64 decode", "data uri", "programming tools", "url encoder", "url decoder", "html entity converter"]
  },
  {
    slug: "ip-subnet-calculator",
    name: "IP Subnet Calculator",
    description: "Calculate IP subnet details from an IP and CIDR mask to find network info and usable hosts.",
    category: "Programming",
    iconName: "Network",
    metaDescription:
      "Calculate IP subnet details from an IP and CIDR mask. Find network addresses, broadcast addresses, subnet masks, and usable hosts.",
    formula: "Network Address = IP Address & Subnet Mask",
    lastUpdated: "2024-07-31",
    seoTitle: "IPv4 Subnet Calculator with CIDR | CalcPro",
    tags: ["subnet calculator", "ip address", "cidr", "networking"]
  },
  {
    slug: "crc-hash-generator",
    name: "CRC-32 Hash Generator",
    description: "Generate a CRC-32 hash (checksum) for any string or text input to verify data integrity.",
    category: "Programming",
    iconName: "Hash",
    seoTitle: "CRC-32 Checksum Hash Generator | CalcPro",
    metaDescription:
      "Generate a CRC-32 hash (checksum) for any string or text input. Our free online tool helps you verify data integrity quickly.",
    lastUpdated: "2024-07-31",
    tags: ["crc32", "hash generator", "checksum", "data integrity"]
  },
  {
    slug: "file-size-calculator",
    name: "File Size Calculator",
    description: "Estimate the size of a media file based on its duration and bitrate for storage and bandwidth planning.",
    category: "Programming",
    iconName: "FileBox",
    seoTitle: "File Size & Bitrate Calculator | CalcPro",
    metaDescription:
      "Estimate the size of a file based on its duration and bitrate. Useful for video & audio files to plan for storage or bandwidth.",
    lastUpdated: "2024-07-31",
    tags: ["file size calculator", "bitrate", "video size", "audio size"]
  },
  {
    slug: "color-converter",
    name: "Color Code Converter",
    description: "A tool for web designers & developers to convert between HEX, RGB, and HSL color formats.",
    category: "Programming",
    iconName: "Palette",
    seoTitle: "HEX, RGB & HSL Color Code Converter | CalcPro",
    metaDescription:
      "A simple tool for web designers & developers to convert between HEX, RGB, and HSL color formats in real-time.",
    lastUpdated: "2024-07-31",
    tags: ["color converter", "hex to rgb", "hsl to hex", "web design tools", "rgb to hex converter", "hex to rgb converter", "color code converter", "cmyk to rgb converter"]
  },

  // Geometry & Engineering
  {
    slug: "circle-calculator",
    name: "Circle Calculator",
    description: "A versatile circle calculator to find area, circumference, diameter, and radius from any known value.",
    category: "Geometry & Engineering",
    iconName: "Circle",
    seoTitle: "Circle Area, Circumference, Diameter & Radius Calculator | CalcPro",
    metaDescription:
      "A versatile circle calculator. Enter radius, diameter, circumference, or area to find the other three properties instantly.",
    lastUpdated: "2024-07-31",
    tags: ["circle calculator", "area of a circle calculator", "circumference", "geometry", "how to find the circumference of a circle if you know the area", "how to calculate the arc length of a part of a circle", "radius of a circle calculator", "diameter of a circle calculator", "equation of a circle calculator", "arc length calculator", "sector area calculator"],
  },
  {
    slug: "triangle-area-calculator",
    name: "Triangle Area & Perimeter",
    description: "Calculate a triangle's area and perimeter using Base & Height, 3 sides (Heron's), or Side-Angle-Side.",
    category: "Geometry & Engineering",
    iconName: "Triangle",
    seoTitle: "Triangle Area & Perimeter Calculator (Heron's Formula) | CalcPro",
    metaDescription:
      "Calculate a triangle's area and perimeter using Base & Height, Heron's formula (3 sides), or Side-Angle-Side (SAS).",
    lastUpdated: "2024-07-31",
    tags: ["triangle calculator", "area calculator", "herons formula", "geometry", "area of a triangle given 3 sides (Heron's formula)", "area of an equilateral triangle with a given side length", "what are the conditions for two triangles to be congruent", "equilateral triangle calculator", "isosceles triangle calculator", "scalene triangle calculator", "area of a triangle calculator"],
  },
  {
    slug: "rectangle-area-calculator",
    name: "Rectangle Area & Perimeter",
    description: "A free online calculator to find the area and perimeter of a rectangle. Just enter length and width.",
    category: "Geometry & Engineering",
    iconName: "Ruler",
    formula: "Area = Length * Width",
    seoTitle: "Rectangle Area & Perimeter Calculator | CalcPro",
    metaDescription:
      "A free online calculator to find the area and perimeter of a rectangle. Just enter the length and width to get instant results. Also find the diagonal.",
    lastUpdated: "2024-07-31",
    tags: ["rectangle calculator", "area calculator", "perimeter", "geometry", "find the diagonal of a rectangle with given length and width", "how to calculate the surface area of a rectangular prism", "square area calculator", "parallelogram area calculator", "trapezoid area calculator", "rhombus area calculator", "polygon calculator", "regular polygon area calculator", "plane geometry calculator", "surface area calculator"],
  },
  {
    slug: "cylinder-volume-calculator",
    name: "Cylinder Volume Calculator",
    description: "Calculate the volume, lateral area, base area, and total surface area of a cylinder.",
    category: "Geometry & Engineering",
    iconName: "Beaker",
    seoTitle: "Cylinder Volume & Surface Area Calculator | CalcPro",
    metaDescription:
      "Calculate the volume, lateral area, base area, and total surface area of a cylinder. Simply enter the radius and height. Also calculates volume in liters for tanks.",
    lastUpdated: "2024-07-31",
    tags: ["cylinder volume", "surface area calculator", "geometry", "3d shapes", "calculate the volume of a cylindrical tank in liters or gallons", "surface area of a cylinder including the top and bottom", "how to calculate the height of a cylinder given its volume and radius", "find the volume of an oblique cylinder", "volume calculator", "solid geometry calculator", "rectangular prism volume calculator"],
  },
  {
    slug: "sphere-volume-surface-area-calculator",
    name: "Sphere Volume & Surface Area",
    description: "Quickly calculate the volume and surface area of a sphere by providing its radius.",
    category: "Geometry & Engineering",
    iconName: "Globe",
    seoTitle: "Sphere Volume & Surface Area Calculator | CalcPro",
    metaDescription:
      "Quickly calculate the volume and surface area of a sphere by providing its radius. Our calculator uses standard geometric formulas.",
    lastUpdated: "2024-07-31",
    tags: ["sphere volume", "surface area", "geometry calculator", "3d shapes", "find the radius of a sphere given its volume", "calculate the volume of a sphere in cubic meters", "find the surface area of a torus", "volume of a sphere calculator", "surface area of a sphere calculator"],
  },
  {
    slug: "cone-volume-calculator",
    name: "Cone Volume Calculator",
    description: "Easily calculate the volume, slant height, and total surface area of a cone from its radius and height.",
    category: "Geometry & Engineering",
    iconName: "Triangle",
    seoTitle: "Cone Volume, Slant Height & Surface Area Calc | CalcPro",
    metaDescription:
      "Easily calculate the volume, slant height, and total surface area of a cone. Just enter the radius and height to get instant results.",
    lastUpdated: "2024-07-31",
    tags: ["cone volume", "surface area", "geometry", "3d shapes", "surface area of a cone formula and step-by-step calculation", "volume of a cone vs volume of a cylinder", "how to find the slant height of a cone with its volume", "cone volume calculator", "cube volume calculator", "pyramid volume calculator"],
  },
  {
    slug: "pythagorean-theorem-calculator",
    name: "Pythagorean Theorem Calculator",
    description: "Easily solve for the missing side of a right-angled triangle using the a² + b² = c² formula.",
    category: "Geometry & Engineering",
    iconName: "Triangle",
    formula: "a² + b² = c²",
    metaDescription:
      "Easily solve for the missing side of a right-angled triangle using the Pythagorean theorem (a² + b² = c²). Finds the hypotenuse or a missing leg.",
    seoTitle: "Pythagorean Theorem Calculator (Find Hypotenuse or Side) | CalcPro",
    lastUpdated: "2024-07-31",
    tags: ["pythagorean theorem", "right triangle calculator", "hypotenuse", "geometry", "pythagorean theorem calculator for a missing hypotenuse", "check if three sides form a right-angled triangle", "pythagorean triples generator", "pythagorean theorem calculator for 3D shapes", "pythagorean theorem calculator with steps", "hypotenuse calculator"],
  },
  {
    slug: "trigonometry-calculator",
    name: "Trigonometry Calculator",
    description: "A free trig calculator to find the sine, cosine, tangent, and their inverses for any angle.",
    category: "Geometry & Engineering",
    iconName: "Triangle",
    seoTitle: "Trigonometry Function Calculator (Sin, Cos, Tan) | CalcPro",
    metaDescription:
      "A free trig calculator to find the sine, cosine, tangent, and their inverses (arcsin, acos, atan) for any angle in degrees or radians.",
    lastUpdated: "2024-07-31",
    tags: ["trigonometry calculator", "sin cos tan", "unit circle", "inverse trig", "find sin cos tan values for any angle in degrees", "find the missing side of a right triangle using trigonometry", "find the missing angle of a right triangle using inverse trig functions", "trig calculator", "sine calculator", "cosine calculator", "tangent calculator", "inverse trig functions calculator", "unit circle calculator"],
  },
  {
    slug: "beam-deflection-calculator",
    name: "Beam Deflection Calculator",
    description: "A simple tool to find the maximum deflection of a cantilever beam with a point load at the end.",
    category: "Geometry & Engineering",
    iconName: "Ruler",
    seoTitle: "Cantilever Beam Deflection Calculator | CalcPro",
    metaDescription:
      "A simple calculator to find the maximum deflection of a cantilever beam with a point load at the end. For structural engineers.",
    lastUpdated: "2024-07-31",
    tags: ["beam deflection", "structural engineering", "cantilever beam", "engineering calculator"],
  },
  {
    slug: "torque-calculator",
    name: "Torque Calculator",
    description: "Calculate the resulting torque by entering the force and distance (lever arm length).",
    category: "Geometry & Engineering",
    iconName: "Wind",
    seoTitle: "Torque Calculator (Force x Distance) | CalcPro",
    metaDescription:
      "Calculate the resulting torque by entering the force and distance (lever arm length). An easy tool for physics and engineering.",
    lastUpdated: "2024-07-31",
    tags: ["torque calculator", "physics", "engineering", "moment of force"],
  },
  {
    slug: "ohms-law-calculator",
    name: "Ohm’s Law Calculator",
    description: "An easy-to-use Ohm's law calculator for voltage (V), current (I), resistance (R), and power (P).",
    category: "Geometry & Engineering",
    iconName: "Atom",
    seoTitle: "Ohm's Law Calculator (V, I, R, P) | CalcPro",
    metaDescription:
      "An easy-to-use Ohm's law calculator for voltage (V), current (I), resistance (R), and power (P). Enter any two values to find the others.",
    lastUpdated: "2024-07-31",
    tags: ["ohms law", "electrical calculator", "voltage", "current", "resistance"],
  },
  {
    slug: "resistor-color-code-calculator",
    name: "Resistor Color Code Calculator",
    description: "Decode 4-band resistor color codes to instantly find the resistance value and tolerance.",
    category: "Geometry & Engineering",
    iconName: "Palette",
    seoTitle: "4-Band Resistor Color Code Decoder | CalcPro",
    metaDescription:
      "Decode 4-band resistor color codes with our tool. Select the colors for each band to instantly find the resistance value and tolerance.",
    lastUpdated: "2024-07-31",
    tags: ["resistor color code", "electronics", "ohms", "resistance"],
  },
  {
    slug: "capacitor-charge-calculator",
    name: "Capacitor Charge Calculator",
    description: "Calculate the charge and current in a charging RC (resistor-capacitor) circuit at a specific time.",
    category: "Geometry & Engineering",
    iconName: "Atom",
    seoTitle: "Capacitor Charge & RC Circuit Calculator | CalcPro",
    metaDescription:
      "Calculate the charge and current in a charging RC (resistor-capacitor) circuit at a specific point in time. For electronics.",
    lastUpdated: "2024-07-31",
    tags: ["capacitor", "rc circuit", "electronics", "time constant"],
  },

  // Education & Miscellaneous
  {
    slug: "gpa-calculator",
    name: "GPA Calculator",
    description: "Calculate your GPA quickly and easily by entering your courses, credits, and grades.",
    category: "Education",
    iconName: "GraduationCap",
    formula: "Σ(Grade Points * Credits) / Σ(Credits)",
    seoTitle: "College & High School GPA Calculator | CalcPro",
    metaDescription:
      "Calculate your GPA quickly and easily. Enter your courses, credits, and grades to find your Grade Point Average on a 4.0 scale.",
    lastUpdated: "2024-07-31",
    tags: ["gpa calculator", "college gpa", "final grade calculator", "what score do I need on my final exam to get an A", "final grade calculator to see what I need to get an A"]
  },
  {
    slug: "grade-percentage-calculator",
    name: "Grade Percentage Calculator",
    description: "Find your grade percentage and letter grade by entering the points you earned and the total points.",
    category: "Miscellaneous",
    iconName: "Percent",
    seoTitle: "Test & Assignment Grade Percentage Calculator | CalcPro",
    metaDescription:
      "Find your grade percentage and letter grade by entering the points you earned and the total possible points. A simple tool for students.",
    lastUpdated: "2024-07-31",
    tags: ["grade calculator", "percentage calculator", "exam marks", "how to calculate percentage of marks for 5 subjects", "best of 5 percentage calculator for ICSE board", "attendance percentage calculator for missing college classes", "how to calculate percentage of marks obtained in all subjects", "grade percentage to gpa converter"],
  },
  {
    slug: "reading-time-calculator",
    name: "Reading Time Calculator",
    description: "Estimate how long it will take to read any text by pasting it and adjusting the Words Per Minute (WPM).",
    category: "Miscellaneous",
    iconName: "Book",
    seoTitle: "Reading Time & Word Count Calculator | CalcPro",
    metaDescription:
      "Estimate how long it will take to read any text. Paste your content & adjust the Words Per Minute (WPM) for a personalized reading time.",
    lastUpdated: "2024-07-31",
    tags: ["reading time calculator", "wpm calculator", "word count", "how long will it take to read a book with a certain number of pages", "reading speed calculator in words per minute", "character counter", "word counter", "text to speech converter", "speech to text converter"],
  },
  {
    slug: "typing-speed-calculator",
    name: "Typing Speed (WPM) Calculator",
    description: "Test your typing speed and accuracy in Words Per Minute (WPM) with sample texts.",
    category: "Miscellaneous",
    iconName: "Keyboard",
    seoTitle: "Typing Speed Test (WPM) & Accuracy Check | CalcPro",
    metaDescription:
      "Test your typing speed and accuracy with our free Words Per Minute (WPM) calculator. Practice with sample texts & get instant results.",
    lastUpdated: "2024-07-31",
    tags: ["typing speed test", "wpm calculator", "keyboarding skills", "typing speed calculator in words per minute", "typing speed converter"],
  },
];
