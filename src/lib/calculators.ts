
import {
  Calculator as CalculatorIcon,
  HeartPulse,
  Landmark,
  Binary,
  ArrowRightLeft,
  CalendarClock,
  Scale,
  Percent,
  FlaskConical,
  Ruler,
  Variable,
  Sigma,
  Pi,
  Clock,
  Banknote,
  GraduationCap,
  Triangle,
  Beaker,
  Bone,
  Car,
  Home,
  PiggyBank,
  Briefcase,
  Wallet,
  Globe,
  Tag,
  Users,
  CreditCard,
  Droplets,
  TestTube,
  Baby,
  Footprints,
  FileBox,
  AreaChart,
  Atom,
  Book,
  Dog,
  Hash,
  Palette,
  Network,
  Circle,
  Foot,
  Thermometer,
  Cloud,
  Wind,
  Gauge,
  Database,
  Shuffle,
  Timer,
  Globe2,
  CalendarDays,
  Gem,
  Keyboard,
  Minus,
  Plus,
  Info,
} from 'lucide-react';
import type { Calculator, Category } from '@/lib/types';
import BMICalculator from '@/components/calculator/bmi-calculator';
import PlaceholderCalculator from '@/components/calculator/placeholder-calculator';
import AgeCalculator from '@/components/calculator/age-calculator';
import LoanEMICalculator from '@/components/calculator/loan-emi-calculator';
import PercentageCalculator from '@/components/calculator/percentage-calculator';
import UnitConverter from '@/components/calculator/unit-converter';
import BmrCalculator from '@/components/calculator/bmr-calculator';
import BinaryConverter from '@/components/calculator/binary-converter';
import GpaCalculator from '@/components/calculator/gpa-calculator';
import DateDifferenceCalculator from '@/components/calculator/date-difference-calculator';
import ColorConverter from '@/components/calculator/color-converter';
import IdealWeightCalculator from '@/components/calculator/ideal-weight-calculator';
import SimpleInterestCalculator from '@/components/calculator/simple-interest-calculator';
import MortgageCalculator from '@/components/calculator/mortgage-calculator';
import BodyFatPercentageCalculator from '@/components/calculator/body-fat-percentage-calculator';
import FractionCalculator from '@/components/calculator/fraction-calculator';
import CircleCalculator from '@/components/calculator/circle-calculator';
import CurrencyConverter from '@/components/calculator/currency-converter';
import TipCalculator from '@/components/calculator/tip-calculator';
import CompoundInterestCalculator from '@/components/calculator/compound-interest-calculator';
import DiscountCalculator from '@/components/calculator/discount-calculator';
import PregnancyDueDateCalculator from '@/components/calculator/pregnancy-due-date-calculator';
import RectangleAreaCalculator from '@/components/calculator/rectangle-area-calculator';
import TimeConverter from '@/components/calculator/time-converter';
import RomanNumeralConverter from '@/components/calculator/roman-numeral-converter';
import SavingsCalculator from '@/components/calculator/savings-calculator';
import CalorieNeedsCalculator from '@/components/calculator/calorie-needs-calculator';
import TriangleAreaCalculator from '@/components/calculator/triangle-area-calculator';
import IpSubnetCalculator from '@/components/calculator/ip-subnet-calculator';
import SalaryCalculator from '@/components/calculator/salary-calculator';
import InflationCalculator from '@/components/calculator/inflation-calculator';
import VatGstCalculator from '@/components/calculator/vat-gst-calculator';
import LeanBodyMassCalculator from '@/components/calculator/lean-body-mass-calculator';
import ReadingTimeCalculator from '@/components/calculator/reading-time-calculator';
import GradePercentageCalculator from '@/components/calculator/grade-percentage-calculator';
import PetAgeCalculator from '@/components/calculator/pet-age-calculator';
import LoanAffordabilityCalculator from '@/components/calculator/loan-affordability-calculator';
import CarbonFootprintCalculator from '@/components/calculator/carbon-footprint-calculator';
import TypingSpeedCalculator from '@/components/calculator/typing-speed-calculator';
import RatioCalculator from '@/components/calculator/ratio-calculator';
import PermutationCombinationCalculator from '@/components/calculator/permutation-combination-calculator';
import StockProfitLossCalculator from '@/components/calculator/stock-profit-loss-calculator';
import WaistToHipRatioCalculator from '@/components/calculator/waist-to-hip-ratio-calculator';
import TimeZoneConverter from '@/components/calculator/time-zone-converter';
import BasicCalculator from '@/components/calculator/basic-calculator';
import PythagoreanTheoremCalculator from '@/components/calculator/pythagorean-theorem-calculator';
import FactorialCalculator from '@/components/calculator/factorial-calculator';
import ScientificCalculator from '@/components/calculator/scientific-calculator';
import RetirementCalculator from '@/components/calculator/retirement-calculator';
import DataStorageConverter from '@/components/calculator/data-storage-converter';
import WaterIntakeCalculator from '@/components/calculator/water-intake-calculator';
import BacCalculator from '@/components/calculator/bac-calculator';
import FuelEfficiencyConverter from '@/components/calculator/fuel-efficiency-converter';
import AsciiTextConverter from '@/components/calculator/ascii-text-converter';
import OhmsLawCalculator from '@/components/calculator/ohms-law-calculator';
import CarLoanCalculator from '@/components/calculator/car-loan-calculator';


export const categories: Category[] = [
  {
    name: "Math",
    slug: "math",
    description: "Solve mathematical problems, from basic to complex.",
    Icon: CalculatorIcon,
  },
  {
    name: "Finance",
    slug: "finance",
    description: "Manage your finances, loans, and investments.",
    Icon: Landmark,
  },
  {
    name: "Health",
    slug: "health",
    description: "Monitor your health and fitness levels.",
    Icon: HeartPulse,
  },
  {
    name: "Conversions",
    slug: "conversions",
    description: "Convert between various units of measurement.",
    Icon: ArrowRightLeft,
  },
  {
    name: "Date & Time",
    slug: "date-time",
    description: "Calculate dates, ages, and time differences.",
    Icon: CalendarClock,
  },
  {
    name: "Programming",
    slug: "programming",
    description: "Tools for developers and programmers.",
    Icon: Binary,
  },
  {
    name: "Geometry & Engineering",
    slug: "geometry-engineering",
    description: "Calculators for geometric shapes and engineering principles.",
    Icon: Triangle,
  },
  {
    name: "Miscellaneous",
    slug: "miscellaneous",
    description: "A collection of other useful calculators.",
    Icon: Gem,
  },
];

export const calculators: Calculator[] = [
  // Math & Logic
  {
    slug: 'basic-calculator',
    name: 'Basic Calculator',
    description: 'Perform basic arithmetic operations.',
    category: 'Math',
    Icon: CalculatorIcon,
    component: BasicCalculator,
  },
  {
    slug: 'scientific-calculator',
    name: 'Scientific Calculator',
    description: 'Perform advanced scientific calculations.',
    category: 'Math',
    Icon: FlaskConical,
    component: ScientificCalculator,
  },
  {
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    description: 'Calculate percentages, increases, and decreases.',
    category: 'Math',
    Icon: Percent,
    formula: '(Part / Whole) * 100',
    component: PercentageCalculator,
  },
  {
    slug: 'fraction-calculator',
    name: 'Fraction Calculator',
    description: 'Add, subtract, multiply, and divide fractions.',
    category: 'Math',
    Icon: Pi,
    component: FractionCalculator,
  },
  {
    slug: 'mixed-number-calculator',
    name: 'Mixed Number Calculator',
    description: 'Work with mixed numbers and fractions.',
    category: 'Math',
    Icon: Pi,
    component: PlaceholderCalculator,
  },
  {
    slug: 'ratio-calculator',
    name: 'Ratio Calculator',
    description: 'Simplify and work with ratios.',
    category: 'Math',
    Icon: Scale,
    component: RatioCalculator,
  },
  {
    slug: 'proportion-calculator',
    name: 'Proportion Calculator',
    description: 'Solve proportions and find missing values.',
    category: 'Math',
    Icon: Variable,
    component: PlaceholderCalculator,
  },
  {
    slug: 'mean-median-mode-calculator',
    name: 'Mean/Median/Mode Calculator',
    description: 'Find the average, middle, and most frequent values.',
    category: 'Math',
    Icon: Sigma,
    component: PlaceholderCalculator,
  },
  {
    slug: 'standard-deviation-calculator',
    name: 'Standard Deviation Calculator',
    description: 'Calculate the standard deviation of a data set.',
    category: 'Math',
    Icon: Sigma,
    component: PlaceholderCalculator,
  },
  {
    slug: 'probability-calculator',
    name: 'Probability Calculator',
    description: 'Calculate the probability of events.',
    category: 'Math',
    Icon: Beaker,
    component: PlaceholderCalculator,
  },
  {
    slug: 'permutation-combination-calculator',
    name: 'Permutation & Combination',
    description: 'Calculate permutations and combinations.',
    category: 'Math',
    Icon: Sigma,
    component: PermutationCombinationCalculator,
  },
  {
    slug: 'factorial-calculator',
    name: 'Factorial Calculator',
    description: 'Calculate the factorial of a number.',
    category: 'Math',
    Icon: Variable,
    component: FactorialCalculator,
    formula: 'n!'
  },
  {
    slug: 'lcm-gcd-calculator',
    name: 'LCM & GCD Calculator',
    description: 'Find the Least Common Multiple and Greatest Common Divisor.',
    category: 'Math',
    Icon: Variable,
    component: PlaceholderCalculator,
  },
  {
    slug: 'square-root-cube-root-calculator',
    name: 'Square/Cube Root Calculator',
    description: 'Calculate square roots and cube roots.',
    category: 'Math',
    Icon: Variable,
    component: PlaceholderCalculator,
  },
  {
    slug: 'exponent-power-calculator',
    name: 'Exponent & Power Calculator',
    description: 'Calculate powers and exponents.',
    category: 'Math',
    Icon: Variable,
    component: PlaceholderCalculator,
  },
  {
    slug: 'logarithm-calculator',
    name: 'Logarithm Calculator',
    description: 'Calculate logarithms with different bases.',
    category: 'Math',
    Icon: Variable,
    component: PlaceholderCalculator,
  },
  {
    slug: 'equation-solver',
    name: 'Equation Solver',
    description: 'Solve linear and quadratic equations.',
    category: 'Math',
    Icon: Variable,
    component: PlaceholderCalculator,
  },
  {
    slug: 'matrix-calculator',
    name: 'Matrix Calculator',
    description: 'Perform matrix operations.',
    category: 'Math',
    Icon: Pi,
    component: PlaceholderCalculator,
  },
  {
    slug: 'complex-number-calculator',
    name: 'Complex Number Calculator',
    description: 'Perform calculations with complex numbers.',
    category: 'Math',
    Icon: Variable,
    component: PlaceholderCalculator,
  },
  {
    slug: 'roman-numeral-converter',
    name: 'Roman Numeral Converter',
    description: 'Convert between Roman numerals and numbers.',
    category: 'Math',
    Icon: ArrowRightLeft,
    component: RomanNumeralConverter,
  },

  // Finance & Money
  {
    slug: 'loan-emi-calculator',
    name: 'Loan EMI Calculator',
    description: 'Calculate your Equated Monthly Installment.',
    category: 'Finance',
    Icon: Landmark,
    formula: 'P * r * (1+r)^n / ((1+r)^n - 1)',
    component: LoanEMICalculator,
  },
  {
    slug: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    description: 'Estimate your monthly mortgage payments.',
    category: 'Finance',
    Icon: Home,
    component: MortgageCalculator,
  },
  {
    slug: 'car-loan-calculator',
    name: 'Car Loan Calculator',
    description: 'Calculate your car loan payments.',
    category: 'Finance',
    Icon: Car,
    component: CarLoanCalculator,
  },
  {
    slug: 'home-loan-calculator',
    name: 'Home Loan Calculator',
    description: 'Estimate your home loan payments and amortization.',
    category: 'Finance',
    Icon: Home,
    component: MortgageCalculator,
  },
  {
    slug: 'simple-interest-calculator',
    name: 'Simple Interest Calculator',
    description: 'Calculate simple interest on a principal amount.',
    category: 'Finance',
    Icon: PiggyBank,
    component: SimpleInterestCalculator,
    formula: 'P * R * T / 100'
  },
  {
    slug: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    description: 'Calculate compound interest over time.',
    category: 'Finance',
    Icon: PiggyBank,
    component: CompoundInterestCalculator,
    formula: 'A = P(1 + r/n)^(nt)'
  },
  {
    slug: 'savings-calculator',
    name: 'Savings Calculator',
    description: 'Plan your savings goals and growth.',
    category: 'Finance',
    Icon: PiggyBank,
    component: SavingsCalculator,
  },
  {
    slug: 'retirement-calculator',
    name: 'Retirement Calculator',
    description: 'Estimate your retirement savings needs.',
    category: 'Finance',
    Icon: PiggyBank,
    component: RetirementCalculator,
  },
  {
    slug: 'investment-return-calculator',
    name: 'Investment Return (ROI) Calculator',
    description: 'Calculate the return on your investments.',
    category: 'Finance',
    Icon: AreaChart,
    component: PlaceholderCalculator,
  },
  {
    slug: 'stock-profit-loss-calculator',
    name: 'Stock Profit/Loss Calculator',
    description: 'Calculate profits or losses from stock trades.',
    category: 'Finance',
    Icon: AreaChart,
    component: StockProfitLossCalculator,
  },
  {
    slug: 'currency-converter',
    name: 'Currency Converter',
    description: 'Convert between different currencies with live rates.',
    category: 'Finance',
    Icon: Globe,
    component: CurrencyConverter,
  },
  {
    slug: 'inflation-calculator',
    name: 'Inflation Calculator',
    description: 'See how inflation affects purchasing power.',
    category: 'Finance',
    Icon: Banknote,
    component: InflationCalculator,
  },
  {
    slug: 'vat-gst-calculator',
    name: 'VAT / GST Calculator',
    description: 'Calculate Value-Added Tax or Goods and Services Tax.',
    category: 'Finance',
    Icon: Tag,
    component: VatGstCalculator,
  },
  {
    slug: 'tip-calculator',
    name: 'Tip Calculator',
    description: 'Calculate tips for services.',
    category: 'Finance',
    Icon: Wallet,
    component: TipCalculator,
  },
  {
    slug: 'discount-calculator',
    name: 'Discount Calculator',
    description: 'Calculate the final price after a discount.',
    category: 'Finance',
    Icon: Tag,
    component: DiscountCalculator,
  },
  {
    slug: 'salary-calculator',
    name: 'Salary Calculator',
    description: 'Calculate your take-home salary.',
    category: 'Finance',
    Icon: Briefcase,
    component: SalaryCalculator,
  },
  {
    slug: 'overtime-pay-calculator',
    name: 'Overtime Pay Calculator',
    description: 'Calculate your overtime pay.',
    category: 'Finance',
    Icon: Clock,
    component: PlaceholderCalculator,
  },
  {
    slug: 'break-even-point-calculator',
    name: 'Break-even Point Calculator',
    description: 'Find the point where revenue equals costs.',
    category: 'Finance',
    Icon: Briefcase,
    component: PlaceholderCalculator,
  },
  {
    slug: 'business-profit-margin-calculator',
    name: 'Profit Margin Calculator',
    description: 'Calculate the profit margin for your business.',
    category: 'Finance',
    Icon: Briefcase,
    component: PlaceholderCalculator,
  },
  {
    slug: 'credit-card-payoff-calculator',
    name: 'Credit Card Payoff Calculator',
    description: 'Plan how to pay off your credit card debt.',
    category: 'Finance',
    Icon: CreditCard,
    component: PlaceholderCalculator,
  },

  // Health & Fitness
  {
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index.',
    category: 'Health',
    Icon: HeartPulse,
    formula: 'weight (kg) / (height (m) * height (m))',
    tags: ['health', 'fitness', 'weight', 'body mass index'],
    component: BMICalculator,
  },
  {
    slug: 'bmr-calculator',
    name: 'BMR Calculator',
    description: 'Estimate your Basal Metabolic Rate.',
    category: 'Health',
    Icon: Scale,
    formula: "Mifflin-St Jeor: 10*weight(kg) + 6.25*height(cm) - 5*age + (gender==='male' ? 5 : -161)",
    component: BmrCalculator,
  },
  {
    slug: 'calorie-needs-calculator',
    name: 'Calorie Needs Calculator',
    description: 'Estimate your daily calorie needs.',
    category: 'Health',
    Icon: HeartPulse,
    component: CalorieNeedsCalculator,
  },
  {
    slug: 'ideal-weight-calculator',
    name: 'Ideal Weight Calculator',
    description: 'Calculate your ideal body weight.',
    category: 'Health',
    Icon: Scale,
    component: IdealWeightCalculator,
    formula: "Robinson Formula (1983)"
  },
  {
    slug: 'body-fat-percentage-calculator',
    name: 'Body Fat Percentage Calculator',
    description: 'Estimate your body fat percentage.',
    category: 'Health',
    Icon: Percent,
    component: BodyFatPercentageCalculator,
    formula: "U.S. Navy Method"
  },
  {
    slug: 'lean-body-mass-calculator',
    name: 'Lean Body Mass Calculator',
    description: 'Calculate your lean body mass.',
    category: 'Health',
    Icon: Bone,
    component: LeanBodyMassCalculator,
  },
  {
    slug: 'waist-to-hip-ratio-calculator',
    name: 'Waist-to-Hip Ratio Calculator',
    description: 'Calculate your waist-to-hip ratio.',
    category: 'Health',
    Icon: Ruler,
    component: WaistToHipRatioCalculator,
  },
  {
    slug: 'pregnancy-due-date-calculator',
    name: 'Pregnancy Due Date Calculator',
    description: 'Estimate your pregnancy due date.',
    category: 'Health',
    Icon: Baby,
    component: PregnancyDueDateCalculator,
    formula: "Naegele's rule"
  },
  {
    slug: 'ovulation-calculator',
    name: 'Ovulation Calculator',
    description: 'Estimate your most fertile days.',
    category: 'Health',
    Icon: CalendarClock,
    component: PlaceholderCalculator,
  },
  {
    slug: 'water-intake-calculator',
    name: 'Water Intake Calculator',
    description: 'Calculate your daily water intake needs.',
    category: 'Health',
    Icon: Droplets,
    component: WaterIntakeCalculator,
  },
  {
    slug: 'heart-rate-zone-calculator',
    name: 'Heart Rate Zone Calculator',
    description: 'Calculate your target heart rate zones.',
    category: 'Health',
    Icon: HeartPulse,
    component: PlaceholderCalculator,
  },
  {
    slug: 'vo2-max-calculator',
    name: 'VO₂ Max Calculator',
    description: 'Estimate your maximum oxygen uptake.',
    category: 'Health',
    Icon: Wind,
    component: PlaceholderCalculator,
  },
  {
    slug: 'blood-alcohol-content-calculator',
    name: 'Blood Alcohol (BAC) Calculator',
    description: 'Estimate your blood alcohol content.',
    category: 'Health',
    Icon: TestTube,
    component: BacCalculator,
  },
  {
    slug: 'child-growth-percentile-calculator',
    name: 'Child Growth Percentile Calculator',
    description: 'Track your child\'s growth percentile.',
    category: 'Health',
    Icon: Baby,
    component: PlaceholderCalculator,
  },

  // Conversions
  {
    slug: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert length, weight, temperature, etc.',
    category: 'Conversions',
    Icon: Ruler,
    component: UnitConverter,
  },
  {
    slug: 'length-converter',
    name: 'Length Converter',
    description: 'Convert between meters, feet, inches, and more.',
    category: 'Conversions',
    Icon: Ruler,
    component: UnitConverter,
  },
  {
    slug: 'weight-mass-converter',
    name: 'Weight/Mass Converter',
    description: 'Convert between kg, lb, g, and more.',
    category: 'Conversions',
    Icon: Scale,
    component: UnitConverter,
  },
  {
    slug: 'temperature-converter',
    name: 'Temperature Converter',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin.',
    category: 'Conversions',
    Icon: Thermometer,
    component: UnitConverter,
  },
  {
    slug: 'area-converter',
    name: 'Area Converter',
    description: 'Convert between sq m, sq ft, acres, and more.',
    category: 'Conversions',
    Icon: Ruler,
    component: UnitConverter,
  },
  {
    slug: 'volume-converter',
    name: 'Volume Converter',
    description: 'Convert between liters, gallons, cups, and more.',
    category: 'Conversions',
    Icon: Beaker,
    component: UnitConverter,
  },
  {
    slug: 'speed-converter',
    name: 'Speed Converter',
    description: 'Convert between mph, km/h, m/s, and more.',
    category: 'Conversions',
    Icon: Gauge,
    component: UnitConverter,
  },
  {
    slug: 'time-converter',
    name: 'Time Converter',
    description: 'Convert between seconds, minutes, hours, and days.',
    category: 'Conversions',
    Icon: Clock,
    component: TimeConverter,
  },
  {
    slug: 'energy-converter',
    name: 'Energy Converter',
    description: 'Convert between joules, calories, kWh, and more.',
    category: 'Conversions',
    Icon: Atom,
    component: PlaceholderCalculator,
  },
  {
    slug: 'pressure-converter',
    name: 'Pressure Converter',
    description: 'Convert between Pa, bar, psi, and more.',
    category: 'Conversions',
    Icon: Cloud,
    component: PlaceholderCalculator,
  },
  {
    slug: 'power-converter',
    name: 'Power Converter',
    description: 'Convert between watts, hp, kW, and more.',
    category: 'Conversions',
    Icon: Wind,
    component: PlaceholderCalculator,
  },
  {
    slug: 'data-storage-converter',
    name: 'Data Storage Converter',
    description: 'Convert between KB, MB, GB, TB, and more.',
    category: 'Conversions',
    Icon: Database,
    component: DataStorageConverter,
  },
  {
    slug: 'data-transfer-rate-converter',
    name: 'Data Transfer Rate Converter',
    description: 'Convert between bps, Kbps, Mbps, and more.',
    category: 'Conversions',
    Icon: Shuffle,
    component: PlaceholderCalculator,
  },
  {
    slug: 'angle-converter',
    name: 'Angle Converter',
    description: 'Convert between degrees and radians.',
    category: 'Conversions',
    Icon: Ruler,
    component: PlaceholderCalculator,
  },
  {
    slug: 'fuel-efficiency-converter',
    name: 'Fuel Efficiency Converter',
    description: 'Convert between mpg and L/100km.',
    category: 'Conversions',
    Icon: Car,
    component: FuelEfficiencyConverter,
  },

  // Date & Time
  {
    slug: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate age from date of birth.',
    category: 'Date & Time',
    Icon: CalendarClock,
    formula: 'Current Date - Date of Birth',
    component: AgeCalculator,
  },
  {
    slug: 'date-difference-calculator',
    name: 'Date Difference Calculator',
    description: 'Calculate the difference between two dates.',
    category: 'Date & Time',
    Icon: CalendarDays,
    component: DateDifferenceCalculator,
    formula: "endDate - startDate"
  },
  {
    slug: 'countdown-timer-calculator',
    name: 'Countdown Timer Calculator',
    description: 'Count down to a specific date and time.',
    category: 'Date & Time',
    Icon: Timer,
    component: PlaceholderCalculator,
  },
  {
    slug: 'time-zone-converter',
    name: 'Time Zone Converter',
    description: 'Convert time between different time zones.',
    category: 'Date & Time',
    Icon: Globe2,
    component: TimeZoneConverter,
  },
  {
    slug: 'world-clock-time-difference-calculator',
    name: 'World Clock Time Difference',
    description: 'Calculate time differences between cities.',
    category: 'Date & Time',
    Icon: Globe,
    component: PlaceholderCalculator,
  },
  {
    slug: 'working-days-calculator',
    name: 'Working Days Calculator',
    description: 'Calculate working days between two dates.',
    category: 'Date & Time',
    Icon: Briefcase,
    component: PlaceholderCalculator,
  },
  {
    slug: 'week-number-calculator',
    name: 'Week Number Calculator',
    description: 'Find the week number for a given date.',
    category: 'Date & Time',
    Icon: CalendarDays,
    component: PlaceholderCalculator,
  },
  {
    slug: 'add-subtract-days-calculator',
    name: 'Add/Subtract Days Calculator',
    description: 'Add or subtract days from a date.',
    category: 'Date & Time',
    Icon: CalendarClock,
    component: PlaceholderCalculator,
  },
  {
    slug: 'business-day-calculator',
    name: 'Business Day Calculator',
    description: 'Find the next business day.',
    category: 'Date & Time',
    Icon: Briefcase,
    component: PlaceholderCalculator,
  },

  // Programming & Tech
  {
    slug: 'binary-decimal-converter',
    name: 'Binary ↔ Decimal Converter',
    description: 'Convert between binary and decimal numbers.',
    category: 'Programming',
    Icon: Binary,
    component: BinaryConverter,
    formula: 'parseInt(num, fromBase).toString(toBase)'
  },
  {
    slug: 'decimal-hexadecimal-converter',
    name: 'Decimal ↔ Hexadecimal Converter',
    description: 'Convert between decimal and hexadecimal numbers.',
    category: 'Programming',
    Icon: Hash,
    component: BinaryConverter,
  },
  {
    slug: 'ascii-text-converter',
    name: 'ASCII ↔ Text Converter',
    description: 'Convert between ASCII codes and text.',
    category: 'Programming',
    Icon: ArrowRightLeft,
    component: AsciiTextConverter,
  },
  {
    slug: 'base64-encode-decode',
    name: 'Base64 Encode/Decode',
    description: 'Encode and decode Base64 strings.',
    category: 'Programming',
    Icon: Binary,
    component: PlaceholderCalculator,
  },
  {
    slug: 'ip-subnet-calculator',
    name: 'IP Subnet Calculator',
    description: 'Calculate IP subnets and networks.',
    category: 'Programming',
    Icon: Network,
    component: IpSubnetCalculator,
  },
  {
    slug: 'crc-hash-generator',
    name: 'CRC/Hash Generator',
    description: 'Generate MD5, SHA-256 and other hashes.',
    category: 'Programming',
    Icon: Hash,
    component: PlaceholderCalculator,
  },
  {
    slug: 'file-size-calculator',
    name: 'File Size Calculator',
    description: 'Calculate file size from bitrate and duration.',
    category: 'Programming',
    Icon: FileBox,
    component: PlaceholderCalculator,
  },
  {
    slug: 'color-code-converter',
    name: 'Color Code Converter',
    description: 'Convert between HEX, RGB, and HSL color codes.',
    category: 'Programming',
    Icon: Palette,
    component: ColorConverter,
  },

  // Geometry & Engineering
  {
    slug: 'circle-area-circumference-calculator',
    name: 'Circle Area & Circumference',
    description: 'Calculate the area and circumference of a circle.',
    category: 'Geometry & Engineering',
    Icon: Circle,
    component: CircleCalculator,
  },
  {
    slug: 'triangle-area-perimeter-calculator',
    name: 'Triangle Area & Perimeter',
    description: 'Calculate the area and perimeter of a triangle.',
    category: 'Geometry & Engineering',
    Icon: Triangle,
    component: TriangleAreaCalculator,
  },
  {
    slug: 'rectangle-square-area-calculator',
    name: 'Rectangle/Square Area',
    description: 'Calculate the area of a rectangle or square.',
    category: 'Geometry & Engineering',
    Icon: Ruler,
    component: RectangleAreaCalculator,
    formula: "Area = Length * Width"
  },
  {
    slug: 'cylinder-volume-calculator',
    name: 'Cylinder Volume Calculator',
    description: 'Calculate the volume of a cylinder.',
    category: 'Geometry & Engineering',
    Icon: Beaker,
    component: PlaceholderCalculator,
  },
  {
    slug: 'sphere-volume-surface-area-calculator',
    name: 'Sphere Volume & Surface Area',
    description: 'Calculate the volume and surface area of a sphere.',
    category: 'Geometry & Engineering',
    Icon: Globe,
    component: PlaceholderCalculator,
  },
  {
    slug: 'cone-volume-calculator',
    name: 'Cone Volume Calculator',
    description: 'Calculate the volume of a cone.',
    category: 'Geometry & Engineering',
    Icon: Triangle,
    component: PlaceholderCalculator,
  },
  {
    slug: 'pythagorean-theorem-calculator',
    name: 'Pythagorean Theorem Calculator',
    description: 'Solve for sides of a right triangle.',
    category: 'Geometry & Engineering',
    Icon: Triangle,
    component: PythagoreanTheoremCalculator,
    formula: 'a² + b² = c²'
  },
  {
    slug: 'trigonometry-calculator',
    name: 'Trigonometry Calculator',
    description: 'Calculate sin, cos, tan, and more.',
    category: 'Geometry & Engineering',
    Icon: Triangle,
    component: PlaceholderCalculator,
  },
  {
    slug: 'beam-deflection-calculator',
    name: 'Beam Deflection Calculator',
    description: 'Calculate the deflection of beams.',
    category: 'Geometry & Engineering',
    Icon: Ruler,
    component: PlaceholderCalculator,
  },
  {
    slug: 'torque-calculator',
    name: 'Torque Calculator',
    description: 'Calculate torque from force and distance.',
    category: 'Geometry & Engineering',
    Icon: Wind,
    component: PlaceholderCalculator,
  },
  {
    slug: 'ohms-law-calculator',
    name: 'Ohm’s Law Calculator',
    description: 'Calculate voltage, current, and resistance.',
    category: 'Geometry & Engineering',
    Icon: Atom,
    component: OhmsLawCalculator,
  },
  {
    slug: 'resistor-color-code-calculator',
    name: 'Resistor Color Code Calculator',
    description: 'Determine resistor values from color codes.',
    category: 'Geometry & Engineering',
    Icon: Palette,
    component: PlaceholderCalculator,
  },
  {
    slug: 'capacitor-charge-discharge-calculator',
    name: 'Capacitor Charge/Discharge',
    description: 'Calculate capacitor charge and discharge times.',
    category: 'Geometry & Engineering',
    Icon: Atom,
    component: PlaceholderCalculator,
  },
  {
    slug: 'inductor-energy-calculator',
    name: 'Inductor Energy Calculator',
    description: 'Calculate the energy stored in an inductor.',
    category: 'Geometry & Engineering',
    Icon: Atom,
    component: PlaceholderCalculator,
  },

  // Education & Miscellaneous
  {
    slug: 'gpa-calculator',
    name: 'GPA Calculator',
    description: 'Calculate your Grade Point Average.',
    category: 'Miscellaneous',
    Icon: GraduationCap,
    component: GpaCalculator,
    formula: 'Σ(Grade Points * Credits) / Σ(Credits)'
  },
  {
    slug: 'grade-percentage-calculator',
    name: 'Grade Percentage Calculator',
    description: 'Calculate your grade percentage.',
    category: 'Miscellaneous',
    Icon: Percent,
    component: GradePercentageCalculator,
  },
  {
    slug: 'reading-time-calculator',
    name: 'Reading Time Calculator',
    description: 'Estimate the time it takes to read a text.',
    category: 'Miscellaneous',
    Icon: Book,
    component: ReadingTimeCalculator,
  },
  {
    slug: 'typing-speed-wpm-calculator',
    name: 'Typing Speed (WPM) Calculator',
    description: 'Measure your words per minute typing speed.',
    category: 'Miscellaneous',
    Icon: Keyboard,
    component: TypingSpeedCalculator,
  },
  {
    slug: 'loan-affordability-calculator',
    name: 'Loan Affordability Calculator',
    description: 'Estimate how much loan you can afford.',
    category: 'Miscellaneous',
    Icon: Landmark,
    component: LoanAffordabilityCalculator,
  },
  {
    slug: 'carbon-footprint-calculator',
    name: 'Carbon Footprint Calculator',
    description: 'Estimate your environmental impact.',
    category: 'Miscellaneous',
    Icon: Footprints,
    component: CarbonFootprintCalculator,
  },
  {
    slug: 'pet-age-calculator',
    name: 'Pet Age Calculator',
    description: 'Calculate your pet\'s age in human years.',
    category: 'Miscellaneous',
    Icon: Dog,
    component: PetAgeCalculator,
  },
];


export const getCalculatorBySlug = (slug: string): Calculator | undefined => {
  return calculators.find((calculator) => calculator.slug === slug);
};
