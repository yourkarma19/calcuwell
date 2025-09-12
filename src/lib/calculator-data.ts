
import type { Calculator } from "@/lib/types";

// This file is separate to avoid bloating the initial bundle of pages
// that don't need the full calculator list immediately.

export const calculatorsData: Omit<Calculator, "component">[] = [
  // New VAT/GST Calculator
  {
    slug: "vat-gst-calculator",
    name: "VAT / GST Calculator",
    description: "Calculate Value-Added Tax or Goods and Services Tax.",
    category: "Finance",
    iconName: "Tag",
    metaDescription:
      "A fast and free VAT/GST calculator. Easily add tax to a net price or find the pre-tax amount from a gross price. Supports any tax rate.",
    formula: "Gross Price = Net Price * (1 + Tax Rate/100)",
    lastUpdated: "2024-07-31",
  },
  // New SIP Calculator
  {
    slug: "sip-calculator",
    name: "SIP Calculator",
    description:
      "Calculate the future value of your Systematic Investment Plan (SIP).",
    category: "Finance",
    iconName: "TrendingUp",
    seoTitle: "SIP Calculator for Indian Investors | CalcPro",
    metaDescription:
      "Estimate the future value of your SIP investments. Enter your monthly investment, expected return rate, and tenure to see how your money can grow.",
    formula: "FV = P × ({[1 + i]^n - 1} / i) × (1 + i)",
    lastUpdated: "2024-07-31",
  },
  // New CGPA Calculator
  {
    slug: "cgpa-calculator",
    name: "CGPA Calculator",
    description:
      "Calculate your Cumulative Grade Point Average from semester grades.",
    category: "Education",
    iconName: "GraduationCap",
    seoTitle: "CGPA Calculator (SGPA to CGPA) | CalcPro",
    metaDescription:
      "Accurately calculate your CGPA by entering your semester GPAs and credits. A simple tool for all students to track academic performance.",
    formula: "CGPA = Σ(Creditsᵢ * SGPAᵢ) / Σ(Total Creditsᵢ)",
    lastUpdated: "2024-07-31",
  },
  // New Net Calorie Calculator
  {
    slug: "net-calorie-calculator",
    name: "Net Calorie Calculator",
    description: "Find your daily calorie balance (surplus or deficit).",
    category: "Health",
    iconName: "Flame",
    metaDescription:
      "Find your daily energy balance. Our Net Calorie Calculator shows if you're in a calorie deficit, surplus, or at maintenance for your weight goals.",
    formula: "Net Calories = Calories Consumed - Calories Burned",
    lastUpdated: "2024-07-31",
  },
  // New Time Card Calculator
  {
    slug: "time-card-calculator",
    name: "Time Card Calculator",
    description:
      "Calculate total work hours and pay for a week, including breaks.",
    category: "Finance",
    iconName: "Clock",
    metaDescription:
      "Calculate weekly work hours & gross pay. Enter start/end times & breaks to get an accurate time card summary. Free & easy to use.",
    formula: "Total Hours = Sum(End Time - Start Time - Break Time)",
    lastUpdated: "2024-07-31",
  },
  // New Concrete Slab Calculator
  {
    slug: "concrete-slab-calculator",
    name: "Concrete Slab Calculator",
    description:
      "Estimate the bags of concrete needed for a slab, footer, or posts.",
    category: "Geometry & Engineering",
    iconName: "Calculator",
    metaDescription:
      "Estimate the volume & number of concrete bags for your project. Works for slabs, footers, & round post holes. Get an instant, free estimate.",
    formula: "Volume = Length × Width × Thickness",
    lastUpdated: "2024-07-31",
  },
  // New Wind Chill Calculator
  {
    slug: "wind-chill-calculator",
    name: "Wind Chill Calculator",
    description: "Calculate the perceived temperature based on wind speed.",
    category: "Miscellaneous",
    iconName: "Wind",
    metaDescription:
      "Calculate wind chill temperature based on air temp & wind speed. Find out how cold it really feels & understand the risk of frostbite.",
    formula:
      "Wind Chill (F) = 35.74 + 0.6215T - 35.75(V^0.16) + 0.4275T(V^0.16)",
    lastUpdated: "2024-07-31",
  },
  // New Cubic Equation Calculator
  {
    slug: "cubic-equation-calculator",
    name: "Cubic Equation Calculator",
    description:
      "Solve cubic equations of the form ax³+bx²+cx+d=0 for their real and complex roots.",
    category: "Math",
    iconName: "Sigma",
    formula: "ax³ + bx² + cx + d = 0",
    metaDescription:
      "Solve any cubic equation instantly. Our calculator finds all real & complex roots & shows the steps using the cubic formula. Free & accurate.",
    lastUpdated: "2024-07-31",
  },
  // New Triangle Angle Calculator
  {
    slug: "triangle-angle-calculator",
    name: "Triangle Angle Calculator",
    description:
      "Find unknown angles in a triangle given three sides (SSS) or two sides and an angle (SAS).",
    category: "Geometry & Engineering",
    iconName: "Triangle",
    formula: "Law of Cosines & Law of Sines",
    metaDescription:
      "Calculate unknown angles in any triangle. Enter side lengths and/or angles to find missing values using the Law of Sines & Cosines.",
    lastUpdated: "2024-07-31",
  },
  // New Tangent Line Calculator
  {
    slug: "tangent-line-calculator",
    name: "Tangent Line Calculator",
    description:
      "Find the equation of a line tangent to a function at a specific point.",
    category: "Math",
    iconName: "Sigma",
    formula: "y - f(a) = f'(a)(x - a)",
    metaDescription:
      "Find the tangent line equation for any function at a given point. Our free calculus calculator provides the full, step-by-step solution.",
    lastUpdated: "2024-07-31",
  },
  // New Fraction to Percentage Calculator
  {
    slug: "fraction-to-percentage-calculator",
    name: "Fraction to Percentage Calculator",
    description: "Convert any fraction into its percentage value.",
    category: "Conversions",
    iconName: "Percent",
    formula: "(Numerator / Denominator) * 100",
    metaDescription:
      "Quickly convert any fraction to a percentage with our free online tool. Shows you the calculation steps and the final answer instantly.",
    lastUpdated: "2024-07-31",
  },
  // New Intercept Calculator
  {
    slug: "intercept-calculator",
    name: "X and Y Intercept Calculator",
    description:
      "Find the x and y-intercepts of any linear equation with a step-by-step breakdown.",
    category: "Math",
    iconName: "Sigma",
    metaDescription:
      "A free calculator to find the x and y-intercepts of a line from any equation form. Get instant results & see step-by-step calculations.",
    formula: "Set x=0 for y-intercept, set y=0 for x-intercept.",
    lastUpdated: "2024-07-31",
  },
  // New Decimal to Inches Calculator
  {
    slug: "decimal-to-inches-calculator",
    name: "Decimal to Inches Fraction Calculator",
    description:
      "Convert any decimal number into inches and a usable fraction.",
    category: "Conversions",
    iconName: "Ruler",
    metaDescription:
      'Convert any decimal value into inches and a usable fraction (e.g., 1/8", 1/16"). Perfect for woodworking, machining, and engineering.',
    lastUpdated: "2024-07-31",
  },
  // New Feet and Inches Calculator
  {
    slug: "feet-and-inches-calculator",
    name: "Feet and Inches Calculator",
    description: "Add, subtract, multiply, and divide feet and inches.",
    category: "Conversions",
    iconName: "Ruler",
    metaDescription:
      "An online calculator to add, subtract, multiply, & divide feet and inches. Perfect for construction & DIY projects. Get instant results.",
    lastUpdated: "2024-07-31",
  },
  // New Voltage to Watts Calculator
  {
    slug: "voltage-to-watts-calculator",
    name: "Voltage to Watts Calculator",
    description: "Convert voltage (V) and current (A) to power in watts (W).",
    category: "Geometry & Engineering",
    iconName: "Atom",
    formula: "Power (P) = Voltage (V) × Current (I)",
    metaDescription:
      "Instantly convert Volts & Amps to Watts using our free online calculator. Understand the power formula (P=VI) with examples and explanations.",
    lastUpdated: "2024-07-31",
  },
  // New Partial Fraction Calculator
  {
    slug: "partial-fraction-calculator",
    name: "Partial Fraction Calculator",
    description: "Decompose rational functions into simpler fractions.",
    category: "Math",
    iconName: "Sigma",
    formula: "f(x) = P(x) / Q(x)",
    metaDescription:
      "Solve partial fraction decomposition problems instantly. Our free online calculator provides a detailed solution for your math homework.",
    lastUpdated: "2024-07-31",
  },

  // Lifestyle
  {
    slug: "wedding-budget-calculator",
    name: "Wedding Budget Calculator",
    description: "Estimate the total cost of your wedding.",
    category: "Lifestyle",
    iconName: "Heart",
    metaDescription:
      "Plan your dream wedding with our free budget calculator. Estimate costs for the venue, catering, and photography to stay on budget.",
    formula: "Total = Venue + (Catering × Guests) + Photography + Dress + ...",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "pet-age-calculator",
    name: "Pet Age Calculator",
    description: "Calculate your pet's age in human years.",
    category: "Lifestyle",
    iconName: "Dog",
    metaDescription:
      "How old is your pet in human years? Use our pet age calculator to convert your dog or cat's age into an equivalent human age.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "pet-care-cost-calculator",
    name: "Pet Care Cost Calculator",
    description: "Estimate the monthly and yearly costs of owning a pet.",
    category: "Lifestyle",
    iconName: "Dog",
    metaDescription:
      "Estimate the annual and monthly costs of pet ownership. Our calculator helps you budget for food, vet care, grooming, and other expenses.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "credit-card-payoff-calculator",
    name: "Credit Card Payoff Calculator",
    description: "Plan how to pay off your credit card debt.",
    category: "Finance",
    iconName: "CreditCard",
    metaDescription:
      "Find out how long it will take to pay off your credit card balance. See your payoff schedule & total interest paid based on your payments.",
    formula: "N = -log(1 - (B*r)/P) / log(1+r)",
    lastUpdated: "2024-07-31",
  },

  // Math & Logic
  {
    slug: "basic-calculator",
    name: "Basic Calculator",
    description: "Perform basic arithmetic operations.",
    category: "Math",
    iconName: "Calculator",
    metaDescription:
      "A simple and fast online calculator for everyday arithmetic. Perform addition, subtraction, multiplication, and division with ease.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Calculate percentages, increases, and decreases.",
    category: "Math",
    iconName: "Percent",
    metaDescription:
      "Easily calculate percentages with our free tool. Find the percentage of a number, percent increase/decrease, & other common problems.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "fraction-calculator",
    name: "Fraction Calculator",
    description: "Add, subtract, multiply, and divide fractions.",
    category: "Math",
    iconName: "Pi",
    metaDescription:
      "Our free fraction calculator makes math easy. Add, subtract, multiply, and divide proper and improper fractions with step-by-step results.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "mixed-number-calculator",
    name: "Mixed Number Calculator",
    description: "Work with mixed numbers and fractions.",
    category: "Math",
    iconName: "Pi",
    metaDescription:
      "A simple calculator for adding, subtracting, multiplying, and dividing mixed numbers. Get accurate answers for complex fraction problems.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "ratio-calculator",
    name: "Ratio Calculator",
    description: "Simplify and work with ratios.",
    category: "Math",
    iconName: "Scale",
    metaDescription:
      "Use our online ratio calculator to simplify ratios and find missing values in a proportion. Fast, easy, and perfect for students.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "proportion-calculator",
    name: "Proportion Calculator",
    description: "Solve proportions and find missing values.",
    category: "Math",
    iconName: "Variable",
    metaDescription:
      "An easy-to-use proportion calculator to help you solve for the missing value in a proportion using cross-multiplication. Includes examples.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "mean-median-mode-calculator",
    name: "Mean/Median/Mode Calculator",
    description: "Find the average, middle, and most frequent values.",
    category: "Math",
    iconName: "Sigma",
    metaDescription:
      "Quickly find the mean, median, mode, and range of any data set. Our calculator helps you understand the central tendency of your data.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "standard-deviation-calculator",
    name: "Standard Deviation Calculator",
    description: "Calculate the standard deviation of a data set.",
    category: "Math",
    iconName: "Sigma",
    metaDescription:
      "Calculate the standard deviation for a sample or population data set. Understand the spread and consistency of your data with our tool.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "probability-calculator",
    name: "Probability Calculator",
    description: "Calculate the probability of events.",
    category: "Math",
    iconName: "Beaker",
    metaDescription:
      "Calculate the probability of single and multiple events with our easy-to-use tool. Perfect for solving problems and understanding chance.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "permutation-combination-calculator",
    name: "Permutation & Combination",
    description: "Calculate permutations and combinations.",
    category: "Math",
    iconName: "Sigma",
    metaDescription:
      "Calculate permutations (nPr) and combinations (nCr) quickly. Understand when order matters in probability with this essential tool.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "factorial-calculator",
    name: "Factorial Calculator",
    description: "Calculate the factorial of a number.",
    category: "Math",
    iconName: "Variable",
    formula: "n!",
    metaDescription:
      "Our online factorial calculator finds the factorial (n!) of any non-negative integer. Includes the formula and an explanation of 0!.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "lcm-gcd-calculator",
    name: "LCM & GCD Calculator",
    description: "Find the Least Common Multiple and Greatest Common Divisor.",
    category: "Math",
    iconName: "Variable",
    metaDescription:
      "Easily calculate the Least Common Multiple (LCM) and Greatest Common Divisor (GCD) of a set of numbers. A tool for number theory.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "square-root-cube-root-calculator",
    name: "Square/Cube Root Calculator",
    description: "Calculate square roots and cube roots.",
    category: "Math",
    iconName: "Variable",
    metaDescription:
      "A simple calculator to find the square root and cube root of any number. Handles both positive and negative inputs. Fast and easy to use.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "exponent-power-calculator",
    name: "Exponent & Power Calculator",
    description: "Calculate powers and exponents.",
    category: "Math",
    iconName: "Variable",
    metaDescription:
      "Quickly calculate the result of a base raised to a power. Handles positive, negative, integer, and fractional exponents with ease.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "logarithm-calculator",
    name: "Logarithm Calculator",
    description: "Calculate logarithms with different bases.",
    category: "Math",
    iconName: "Variable",
    metaDescription:
      "An easy-to-use log calculator. Solve for the logarithm of any number with any base, including common logs and natural logs (ln).",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "equation-solver",
    name: "Equation Solver",
    description: "Solve linear and quadratic equations.",
    category: "Math",
    iconName: "Variable",
    metaDescription:
      "Solve linear (ax+b=c) and quadratic (ax²+bx+c=0) equations instantly. Our online tool provides the solution(s) and the formulas used.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "matrix-calculator",
    name: "Matrix Calculator",
    description: "Perform matrix operations.",
    category: "Math",
    iconName: "Pi",
    metaDescription:
      "A simple matrix calculator for performing addition and subtraction on 2x2 matrices. Enter the matrix values to get an instant result.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "complex-number-calculator",
    name: "Complex Number Calculator",
    description: "Perform calculations with complex numbers.",
    category: "Math",
    iconName: "Variable",
    metaDescription:
      "Perform arithmetic on complex numbers. Add, subtract, multiply, and divide complex numbers in the form a + bi and get instant results.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "roman-numeral-converter",
    name: "Roman Numeral Converter",
    description: "Convert between Roman numerals and numbers.",
    category: "Math",
    iconName: "ArrowRightLeft",
    metaDescription:
      "A fast and accurate Roman numeral converter. Translate numbers to Roman numerals and back for values between 1 and 3,999.",
    lastUpdated: "2024-07-31",
  },

  // Finance & Money
  {
    slug: "loan-emi-calculator",
    name: "Loan EMI Calculator",
    description: "Calculate your Equated Monthly Installment.",
    category: "Finance",
    iconName: "Landmark",
    seoTitle: "Loan EMI Calculator with Prepayments | CalcPro",
    formula: "P * r * (1+r)^n / ((1+r)^n - 1)",
    metaDescription:
      "Calculate your loan EMI and see how extra payments can reduce your loan tenure and save you money. For home, car, or personal loans.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "loan-comparison-calculator",
    name: "Loan Comparison Calculator",
    description: "Compare two loans side-by-side.",
    category: "Finance",
    iconName: "Scale",
    metaDescription:
      "Compare two loans instantly. Our calculator shows the EMI and total cost side-by-side to help you choose the cheapest option.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "mortgage-calculator",
    name: "Mortgage Calculator",
    description: "Estimate your monthly mortgage payments.",
    category: "Finance",
    iconName: "House",
    seoTitle: "Mortgage Calculator with PITI & Amortization | CalcPro",
    formula: "P * r * (1+r)^n / ((1+r)^n - 1)",
    metaDescription:
      "Estimate your monthly mortgage payment, including principal, interest, taxes, and insurance (PITI). Plan your home budget with our calculator.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "car-loan-calculator",
    name: "Car Loan Calculator",
    description: "Calculate your car loan payments.",
    category: "Finance",
    iconName: "Car",
    formula: "P * r * (1+r)^n / ((1+r)^n - 1)",
    metaDescription:
      "Calculate your monthly car loan payment (EMI) and total cost. Our calculator helps you understand your auto loan before you buy.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "simple-interest-calculator",
    name: "Simple Interest Calculator",
    description: "Calculate simple interest on a principal amount.",
    category: "Finance",
    iconName: "PiggyBank",
    formula: "P * R * T / 100",
    metaDescription:
      "Quickly calculate simple interest on your loans or investments. Our free calculator uses the standard SI formula and explains how it works.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    description: "Calculate compound interest over time.",
    category: "Finance",
    iconName: "PiggyBank",
    formula: "A = P(1 + r/n)^(nt)",
    metaDescription:
      "See how your savings can grow with compound interest. Our calculator projects your investment growth over time with this tool.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "savings-calculator",
    name: "Savings Calculator",
    description: "Plan your savings goals and growth.",
    category: "Finance",
    iconName: "PiggyBank",
    metaDescription:
      "Project the future value of your savings with our easy calculator. See how deposits, contributions, and interest rates impact your growth.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "retirement-calculator",
    name: "Retirement Calculator",
    description: "Estimate your retirement savings needs.",
    category: "Finance",
    iconName: "PiggyBank",
    metaDescription:
      "Plan for your future with our retirement calculator. Estimate how much you need to save to meet your retirement goals and see if you are on track.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "investment-return-calculator",
    name: "Investment Return (ROI) Calculator",
    description: "Calculate the return on your investments.",
    category: "Finance",
    iconName: "AreaChart",
    metaDescription:
      "Calculate the Return on Investment (ROI) for any investment. Enter your initial and final values to find the net profit and ROI percentage.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "stock-profit-loss-calculator",
    name: "Stock Profit/Loss Calculator",
    description: "Calculate profits or losses from stock trades.",
    category: "Finance",
    iconName: "AreaChart",
    metaDescription:
      "Determine the profit or loss from your stock trades. Factor in buy/sell prices and commissions to find your true Return on Investment (ROI).",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "currency-converter",
    name: "Currency Converter",
    description: "Convert between different currencies with mock rates.",
    category: "Finance",
    iconName: "Globe",
    metaDescription:
      "A simple currency converter for mock exchange rates. Convert between major world currencies like USD, EUR, JPY, GBP, INR, and more.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "inflation-calculator",
    name: "Inflation Calculator",
    description: "See how inflation affects purchasing power.",
    category: "Finance",
    iconName: "Banknote",
    metaDescription:
      "Use our inflation calculator to see how the purchasing power of money has changed over time. Enter an amount & year range to see its value.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "tip-calculator",
    name: "Tip Calculator",
    description: "Calculate tips for services.",
    category: "Finance",
    iconName: "Wallet",
    metaDescription:
      "A quick and easy tip calculator. Determine the tip amount for any bill and split the total cost among any number of people.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "discount-calculator",
    name: "Discount Calculator",
    description: "Calculate the final price after a discount.",
    category: "Finance",
    iconName: "Tag",
    metaDescription:
      "Easily calculate the final price after a discount. Enter the original price & discount percentage to find out how much you will pay and save.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "salary-calculator",
    name: "Salary Calculator",
    description: "Calculate your take-home salary.",
    category: "Finance",
    iconName: "Briefcase",
    metaDescription:
      "Estimate your take-home pay by entering your gross salary and tax/deduction rates. See a breakdown of your net income for better budgeting.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "overtime-pay-calculator",
    name: "Overtime Pay Calculator",
    description: "Calculate your overtime pay.",
    category: "Finance",
    iconName: "Clock",
    metaDescription:
      "Calculate your total pay including overtime. Enter your hourly rate, regular hours, and OT multiplier to see your complete weekly earnings.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "break-even-point-calculator",
    name: "Break-even Point Calculator",
    description: "Find the point where revenue equals costs.",
    category: "Finance",
    iconName: "Briefcase",
    metaDescription:
      "Determine the break-even point for your business. Enter fixed costs, variable costs, & price per unit to find how many units you need to sell.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "business-profit-margin-calculator",
    name: "Profit Margin Calculator",
    description: "Calculate the profit margin for your business.",
    category: "Finance",
    iconName: "Briefcase",
    metaDescription:
      "Calculate the gross, operating, and net profit margins for your business. Understand your profitability with this easy financial tool.",
    lastUpdated: "2024-07-31",
  },

  // Health & Fitness
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index.",
    category: "Health",
    iconName: "HeartPulse",
    seoTitle: "BMI Calculator for Adults (Metric & Imperial) | CalcPro",
    formula: "weight (kg) / (height (m) * height (m))",
    tags: ["health", "fitness", "weight", "body mass index"],
    metaDescription:
      "Calculate your Body Mass Index (BMI) to assess your weight status. Our calculator uses the standard formula and provides WHO categories.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "bmr-calculator",
    name: "BMR Calculator",
    description: "Calculate Your Basal Metabolic Rate.",
    category: "Health",
    iconName: "Scale",
    seoTitle: "Accurate BMR Calculator (Mifflin-St Jeor) | CalcPro",
    formula:
      "Mifflin-St Jeor: 10*weight(kg) + 6.25*height(cm) - 5*age + (gender==='male' ? 5 : -161)",
    metaDescription:
      "Calculate your Basal Metabolic Rate (BMR) to find out the number of calories your body needs at rest. Uses the Mifflin-St Jeor equation.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "calorie-needs-calculator",
    name: "Calorie Needs Calculator",
    description: "Estimate your daily calorie needs.",
    category: "Health",
    iconName: "HeartPulse",
    metaDescription:
      "Estimate the calories you need daily to maintain your weight, based on your age, gender, height, weight, and activity level.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "ideal-weight-calculator",
    name: "Ideal Weight Calculator",
    description: "Calculate your ideal body weight.",
    category: "Health",
    iconName: "Scale",
    formula: "Robinson Formula (1983)",
    metaDescription:
      "Determine your ideal body weight based on height and gender using the Robinson formula. A useful tool for setting fitness goals.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "body-fat-percentage-calculator",
    name: "Body Fat Percentage Calculator",
    description: "Estimate body fat with a tape measure.",
    category: "Health",
    iconName: "Percent",
    formula: "U.S. Navy Method",
    metaDescription:
      "Estimate your body fat percentage using the U.S. Navy method with a tape measure. A more accurate assessment of health than BMI alone.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "lean-body-mass-calculator",
    name: "Lean Body Mass Calculator",
    description: "Calculate your lean body mass.",
    category: "Health",
    iconName: "Bone",
    metaDescription:
      "Estimate your lean body mass (LBM) using the Boer formula. LBM represents the weight of your body minus fat, including muscle and bone.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "waist-to-hip-ratio-calculator",
    name: "Waist-to-Hip Ratio Calculator",
    description: "Calculate your waist-to-hip ratio.",
    category: "Health",
    iconName: "Ruler",
    metaDescription:
      "Calculate your Waist-to-Hip Ratio (WHR) to assess your body fat distribution and potential health risks. Learn what your WHR means.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "pregnancy-due-date-calculator",
    name: "Pregnancy Due Date Calculator",
    description: "Estimate your pregnancy due date.",
    category: "Health",
    iconName: "Baby",
    formula: "Naegele's rule",
    metaDescription:
      "Get an estimated due date for your baby using your last menstrual period (LMP) or date of conception. Learn about due date methods.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "ovulation-calculator",
    name: "Ovulation Calculator",
    description: "Estimate your most fertile days.",
    category: "Health",
    iconName: "CalendarClock",
    metaDescription:
      "Estimate your fertile window and ovulation date based on your menstrual cycle. Our tool helps you predict your most fertile days.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "water-intake-calculator",
    name: "Water Intake Calculator",
    description: "Calculate your daily water intake needs.",
    category: "Health",
    iconName: "Droplets",
    metaDescription:
      "Estimate your recommended daily water intake based on your age, weight, and activity level. Stay hydrated with our personalized calculator.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "heart-rate-zone-calculator",
    name: "Heart Rate Zone Calculator",
    description: "Calculate your target heart rate zones.",
    category: "Health",
    iconName: "HeartPulse",
    metaDescription:
      "Determine your target heart rate zones for exercise. Use our calculator to find your optimal zones for fat burning, cardio, and performance.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "vo2-max-calculator",
    name: "VO₂ Max Calculator",
    description: "Estimate your maximum oxygen uptake.",
    category: "Health",
    iconName: "Wind",
    metaDescription:
      "Estimate your VO₂ max, a key indicator of your cardiovascular fitness. This non-exercise estimation is based on your resting heart rate.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "bac-calculator",
    name: "Blood Alcohol (BAC) Calculator",
    description: "Estimate your blood alcohol content.",
    category: "Health",
    iconName: "TestTube",
    metaDescription:
      "Estimate your Blood Alcohol Content (BAC) using the Widmark formula. This calculator provides an educational estimate & is not for legal use.",
    lastUpdated: "2024-07-31",
  },

  // Conversions
  {
    slug: "unit-converter",
    name: "Unit Converter",
    description: "Convert length, weight, temperature, etc.",
    category: "Conversions",
    iconName: "Ruler",
    metaDescription:
      "A versatile unit converter for length, weight, temperature, area, volume, and speed. Fast and easy to use for various measurements.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "data-storage-converter",
    name: "Data Storage Converter",
    description: "Convert between KB, MB, GB, TB, and more.",
    category: "Conversions",
    iconName: "Database",
    metaDescription:
      "Convert between digital data storage units, from bits and bytes to kilobytes (KB), megabytes (MB), gigabytes (GB), and terabytes (TB).",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "data-transfer-rate-converter",
    name: "Data Transfer Rate Converter",
    description: "Convert between bps, Kbps, Mbps, and more.",
    category: "Conversions",
    iconName: "Shuffle",
    metaDescription:
      "Convert data transfer speeds, like megabits per second (Mbps) to megabytes per second (MB/s). For internet speed & file downloads.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "time-converter",
    name: "Time Converter",
    description: "Convert between seconds, minutes, hours, and days.",
    category: "Conversions",
    iconName: "Clock",
    metaDescription:
      "A simple and fast time converter for various units of time, including seconds, minutes, hours, days, weeks, and years (approximate).",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "energy-converter",
    name: "Energy Converter",
    description: "Convert between joules, calories, kWh, and more.",
    category: "Conversions",
    iconName: "Atom",
    metaDescription:
      "Convert between different units of energy, such as Joules, Kilojoules, calories, Kilocalories (kcal), and Kilowatt-hours (kWh).",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "pressure-converter",
    name: "Pressure Converter",
    description: "Convert between Pa, bar, psi, and more.",
    category: "Conversions",
    iconName: "Cloud",
    metaDescription:
      "Convert between various units of pressure, including Pascal (Pa), Kilopascal (kPa), bar, atmosphere (atm), and psi.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "power-converter",
    name: "Power Converter",
    description: "Convert between watts, hp, kW, and more.",
    category: "Conversions",
    iconName: "Wind",
    metaDescription:
      "A tool for converting between different units of power, such as watts (W), kilowatts (kW), and horsepower (hp).",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "angle-converter",
    name: "Angle Converter",
    description: "Convert between degrees and radians.",
    category: "Conversions",
    iconName: "Ruler",
    metaDescription:
      "Quickly convert angles between degrees and radians. An essential tool for students and professionals in math, physics, and engineering.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "fuel-efficiency-converter",
    name: "Fuel Efficiency Converter",
    description: "Convert between mpg and L/100km.",
    category: "Conversions",
    iconName: "Car",
    metaDescription:
      "Convert fuel efficiency units between Miles Per Gallon (MPG) and Liters per 100 kilometers (L/100km). Useful for comparing vehicles.",
    lastUpdated: "2024-07-31",
  },

  // Date & Time
  {
    slug: "age-calculator",
    name: "Age Calculator",
    description: "Calculate age from date of birth.",
    category: "Date & Time",
    iconName: "CalendarClock",
    seoTitle: "Age Calculator: Find Your Age in Years, Months, Days | CalcPro",
    formula: "Current Date - Date of Birth",
    metaDescription:
      "Find your exact age in years, months, and days with our online age calculator. Simply enter your date of birth to get your age.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "date-difference-calculator",
    name: "Date Difference Calculator",
    description: "Calculate days between two dates.",
    category: "Date & Time",
    iconName: "CalendarDays",
    formula: "endDate - startDate",
    metaDescription:
      "Calculate the exact number of years, months, weeks, & days between any two dates. Perfect for finding the duration of projects and events.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "countdown-timer",
    name: "Countdown Timer",
    description: "Count down to a specific date and time.",
    category: "Date & Time",
    iconName: "Timer",
    metaDescription:
      "Set a countdown to any date & time. Our online timer will track the days, hours, minutes, and seconds remaining until your event.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "time-zone-converter",
    name: "Time Zone Converter",
    description: "Convert time between different time zones.",
    category: "Date & Time",
    iconName: "Globe",
    metaDescription:
      "Easily convert the time between different time zones around the world. Find the time difference between any two cities instantly.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "world-clock-calculator",
    name: "World Clock",
    description: "Calculate time differences between cities.",
    category: "Date & Time",
    iconName: "Globe",
    metaDescription:
      "View the current local time in major cities across the globe. Our world clock is an easy way to check time differences and plan calls.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "working-days-calculator",
    name: "Working Days Calculator",
    description: "Calculate business days between two dates.",
    category: "Date & Time",
    iconName: "Briefcase",
    metaDescription:
      "Calculate the number of working days (business days) between two dates. This tool excludes weekends to give you an accurate count.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "week-number-calculator",
    name: "Week Number Calculator",
    description: "Find the week number for a given date.",
    category: "Date & Time",
    iconName: "CalendarDays",
    metaDescription:
      "Quickly find the week number for any date using different standards, including ISO 8601. An essential tool for weekly scheduling.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "add-subtract-days-calculator",
    name: "Add/Subtract Days Calculator",
    description: "Add or subtract days from a date.",
    category: "Date & Time",
    iconName: "CalendarClock",
    metaDescription:
      "Find a future or past date by adding or subtracting days from a start date. Perfect for calculating deadlines, follow-ups, and events.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "business-day-calculator",
    name: "Business Day Calculator",
    description: "Find the next business day.",
    category: "Date & Time",
    iconName: "Briefcase",
    metaDescription:
      "Calculate a future date by adding or subtracting business days, automatically skipping weekends to ensure accuracy for deadlines.",
    lastUpdated: "2024-07-31",
  },

  // Programming & Tech
  {
    slug: "binary-converter",
    name: "Binary & Number System Converter",
    description: "Convert between binary, decimal, hex, and octal.",
    category: "Programming",
    iconName: "Binary",
    formula: "parseInt(num, fromBase).toString(toBase)",
    metaDescription:
      "A versatile number system converter for binary, decimal, hexadecimal, and octal values. For programmers and computer science students.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "ascii-text-converter",
    name: "ASCII ↔ Text Converter",
    description: "Convert between ASCII codes and text.",
    category: "Programming",
    iconName: "ArrowRightLeft",
    metaDescription:
      "Easily convert ASCII codes to text characters and text to ASCII values. A simple and instant tool for developers working with encoding.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "base64-converter",
    name: "Base64 Encoder/Decoder",
    description: "Encode and decode Base64 strings.",
    category: "Programming",
    iconName: "Binary",
    metaDescription:
      "A free online tool to encode your data to Base64 or decode a Base64 string back to its original format. Supports UTF-8 text.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "ip-subnet-calculator",
    name: "IP Subnet Calculator",
    description: "Calculate IP subnets and networks.",
    category: "Programming",
    iconName: "Network",
    metaDescription:
      "Calculate IP subnet details from an IP and CIDR mask. Find network addresses, broadcast addresses, subnet masks, and usable hosts.",
    formula: "Network Address = IP Address & Subnet Mask",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "crc-hash-generator",
    name: "CRC-32 Hash Generator",
    description: "Generate a CRC-32 checksum for your text input.",
    category: "Programming",
    iconName: "Hash",
    metaDescription:
      "Generate a CRC-32 hash (checksum) for any string or text input. Our free online tool helps you verify data integrity quickly.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "file-size-calculator",
    name: "File Size Calculator",
    description: "Calculate file size from bitrate and duration.",
    category: "Programming",
    iconName: "FileBox",
    metaDescription:
      "Estimate the size of a file based on its duration and bitrate. Useful for video & audio files to plan for storage or bandwidth.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "color-converter",
    name: "Color Code Converter",
    description: "Convert between HEX, RGB, and HSL color codes.",
    category: "Programming",
    iconName: "Palette",
    metaDescription:
      "A simple tool for web designers & developers to convert between HEX, RGB, and HSL color formats in real-time.",
    lastUpdated: "2024-07-31",
  },

  // Geometry & Engineering
  {
    slug: "circle-calculator",
    name: "Circle Calculator",
    description: "Calculate the area and circumference of a circle.",
    category: "Geometry & Engineering",
    iconName: "Circle",
    metaDescription:
      "A versatile circle calculator. Enter radius, diameter, circumference, or area to find the other three properties instantly.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "triangle-area-calculator",
    name: "Triangle Area & Perimeter",
    description: "Calculate the area and perimeter of a triangle.",
    category: "Geometry & Engineering",
    iconName: "Triangle",
    metaDescription:
      "Calculate a triangle's area and perimeter using Base & Height, Heron's formula (3 sides), or Side-Angle-Side (SAS).",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "rectangle-area-calculator",
    name: "Rectangle Area & Perimeter",
    description: "Calculate the area of a rectangle or square.",
    category: "Geometry & Engineering",
    iconName: "Ruler",
    formula: "Area = Length * Width",
    metaDescription:
      "A free online calculator to find the area and perimeter of a rectangle. Just enter the length and width to get instant results.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "cylinder-volume-calculator",
    name: "Cylinder Volume Calculator",
    description: "Calculate the volume of a cylinder.",
    category: "Geometry & Engineering",
    iconName: "Beaker",
    metaDescription:
      "Calculate the volume, lateral area, base area, and total surface area of a cylinder. Simply enter the radius and height.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "sphere-volume-surface-area-calculator",
    name: "Sphere Volume & Surface Area",
    description: "Calculate the volume and surface area of a sphere.",
    category: "Geometry & Engineering",
    iconName: "Globe",
    metaDescription:
      "Quickly calculate the volume and surface area of a sphere by providing its radius. Our calculator uses standard geometric formulas.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "cone-volume-calculator",
    name: "Cone Volume Calculator",
    description: "Calculate the volume of a cone.",
    category: "Geometry & Engineering",
    iconName: "Triangle",
    metaDescription:
      "Easily calculate the volume, slant height, and total surface area of a cone. Just enter the radius and height to get instant results.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "pythagorean-theorem-calculator",
    name: "Pythagorean Theorem Calculator",
    description: "Solve for sides of a right triangle.",
    category: "Geometry & Engineering",
    iconName: "Triangle",
    formula: "a² + b² = c²",
    metaDescription:
      "Easily solve for the missing side of a right-angled triangle using the Pythagorean theorem (a² + b² = c²). Finds the hypotenuse or other sides.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "trigonometry-calculator",
    name: "Trigonometry Calculator",
    description: "Calculate sin, cos, tan, and more.",
    category: "Geometry & Engineering",
    iconName: "Triangle",
    metaDescription:
      "A free trig calculator to find sine, cosine, tangent, and their inverses (asin, acos, atan) for any angle in degrees or radians.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "beam-deflection-calculator",
    name: "Beam Deflection Calculator",
    description: "Calculate the deflection of beams.",
    category: "Geometry & Engineering",
    iconName: "Ruler",
    metaDescription:
      "A simple calculator to find the maximum deflection of a cantilever beam with a point load at the end. For structural engineers.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "torque-calculator",
    name: "Torque Calculator",
    description: "Calculate torque from force and distance.",
    category: "Geometry & Engineering",
    iconName: "Wind",
    metaDescription:
      "Calculate the resulting torque by entering the force and distance (lever arm length). An easy tool for physics and engineering.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "ohms-law-calculator",
    name: "Ohm’s Law Calculator",
    description: "Calculate voltage, current, and resistance.",
    category: "Geometry & Engineering",
    iconName: "Atom",
    metaDescription:
      "An easy-to-use Ohm's law calculator for voltage (V), current (I), resistance (R), and power (P). Enter any two values to find the others.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "resistor-color-code-calculator",
    name: "Resistor Color Code Calculator",
    description: "Decode 4-band resistor color codes.",
    category: "Geometry & Engineering",
    iconName: "Palette",
    metaDescription:
      "Decode 4-band resistor color codes with our tool. Select the colors for each band to instantly find the resistance value and tolerance.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "capacitor-charge-calculator",
    name: "Capacitor Charge Calculator",
    description: "Calculate capacitor charge and discharge times.",
    category: "Geometry & Engineering",
    iconName: "Atom",
    metaDescription:
      "Calculate the charge and current in a charging RC (resistor-capacitor) circuit at a specific point in time. For electronics.",
    lastUpdated: "2024-07-31",
  },

  // Education & Miscellaneous
  {
    slug: "gpa-calculator",
    name: "GPA Calculator",
    description: "Calculate your Grade Point Average.",
    category: "Education",
    iconName: "GraduationCap",
    formula: "Σ(Grade Points * Credits) / Σ(Credits)",
    metaDescription:
      "Calculate your GPA quickly and easily. Enter your courses, credits, and grades to find your Grade Point Average on a 4.0 scale.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "grade-percentage-calculator",
    name: "Grade Percentage Calculator",
    description: "Calculate your grade percentage.",
    category: "Miscellaneous",
    iconName: "Percent",
    metaDescription:
      "Find your grade percentage and letter grade by entering the points you earned and the total possible points. A simple tool for students.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "reading-time-calculator",
    name: "Reading Time Calculator",
    description: "Estimate the time it takes to read a text.",
    category: "Miscellaneous",
    iconName: "Book",
    metaDescription:
      "Estimate how long it will take to read any text. Paste your content & adjust the Words Per Minute (WPM) for a personalized reading time.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "typing-speed-calculator",
    name: "Typing Speed (WPM) Calculator",
    description: "Measure your words per minute typing speed.",
    category: "Miscellaneous",
    iconName: "Keyboard",
    metaDescription:
      "Test your typing speed and accuracy with our free Words Per Minute (WPM) calculator. Practice with sample texts & get instant results.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "loan-affordability-calculator",
    name: "Loan Affordability Calculator",
    description: "Estimate how much loan you can afford.",
    category: "Miscellaneous",
    iconName: "Landmark",
    metaDescription:
      "Estimate how much you can afford to borrow based on your income, monthly debts, and desired loan terms. For home or car loan planning.",
    lastUpdated: "2024-07-31",
  },
  {
    slug: "carbon-footprint-calculator",
    name: "Carbon Footprint Calculator",
    description: "Estimate your environmental impact.",
    category: "Miscellaneous",
    iconName: "Footprints",
    metaDescription:
      "Get a rough estimate of your carbon footprint based on your daily commute, energy use, and diet. Understand your environmental impact.",
    lastUpdated: "2024-07-31",
  },
];
