"use client";

import { type ReadonlyURLSearchParams } from "next/navigation";

// Statically import all calculator components
import AgeCalculator from "./age-calculator";
import AngleConverter from "./angle-converter";
import AsciiTextConverter from "./ascii-text-converter";
import BacCalculator from "./bac-calculator";
import Base64Converter from "./base64-converter";
import BasicCalculator from "./basic-calculator";
import BeamDeflectionCalculator from "./beam-deflection-calculator";
import BinaryConverter from "./binary-converter";
import BmiCalculator from "./bmi-calculator";
import BmrCalculator from "./bmr-calculator";
import BodyFatPercentageCalculator from "./body-fat-percentage-calculator";
import BreakEvenPointCalculator from "./break-even-point-calculator";
import BusinessDayCalculator from "./business-day-calculator";
import BusinessProfitMarginCalculator from "./business-profit-margin-calculator";
import CalorieNeedsCalculator from "./calorie-needs-calculator";
import CapacitorChargeCalculator from "./capacitor-charge-calculator";
import CarLoanCalculator from "./car-loan-calculator";
import CgpaCalculator from "./cgpa-calculator";
import CircleCalculator from "./circle-calculator";
import ColorConverter from "./color-converter";
import ComplexNumberCalculator from "./complex-number-calculator";
import CompoundInterestCalculator from "./compound-interest-calculator";
import ConcreteSlabCalculator from "./concrete-slab-calculator";
import ConeVolumeCalculator from "./cone-volume-calculator";
import CountdownTimer from "./countdown-timer";
import CrcHashGenerator from "./crc-hash-generator";
import CreditCardPayoffCalculator from "./credit-card-payoff-calculator";
import CubicEquationCalculator from "./cubic-equation-calculator";
import CurrencyConverter from "./currency-converter";
import CylinderVolumeCalculator from "./cylinder-volume-calculator";
import DataStorageConverter from "./data-storage-converter";
import DataTransferRateConverter from "./data-transfer-rate-converter";
import DateDifferenceCalculator from "./date-difference-calculator";
import DecimalToInchesCalculator from "./decimal-to-inches-calculator";
import DiscountCalculator from "./discount-calculator";
import EnergyConverter from "./energy-converter";
import EquationSolver from "./equation-solver";
import ExponentPowerCalculator from "./exponent-power-calculator";
import FactorialCalculator from "./factorial-calculator";
import FeetAndInchesCalculator from "./feet-and-inches-calculator";
import FileSizeCalculator from "./file-size-calculator";
import FractionCalculator from "./fraction-calculator";
import FractionToPercentageCalculator from "./fraction-to-percentage-calculator";
import FuelEfficiencyConverter from "./fuel-efficiency-converter";
import GpaCalculator from "./gpa-calculator";
import GradePercentageCalculator from "./grade-percentage-calculator";
import HeartRateZoneCalculator from "./heart-rate-zone-calculator";
import IdealWeightCalculator from "./ideal-weight-calculator";
import InflationCalculator from "./inflation-calculator";
import InterceptCalculator from "./intercept-calculator";
import InvestmentReturnCalculator from "./investment-return-calculator";
import IpSubnetCalculator from "./ip-subnet-calculator";
import LcmGcdCalculator from "./lcm-gcd-calculator";
import LeanBodyMassCalculator from "./lean-body-mass-calculator";
import LoanAffordabilityCalculator from "./loan-affordability-calculator";
import LoanComparisonCalculator from "./loan-comparison-calculator";
import LoanEMICalculator from "./loan-emi-calculator";
import LogarithmCalculator from "./logarithm-calculator";
import MatrixCalculator from "./matrix-calculator";
import MeanMedianModeCalculator from "./mean-median-mode-calculator";
import MixedNumberCalculator from "./mixed-number-calculator";
import MortgageCalculator from "./mortgage-calculator";
import NetCalorieCalculator from "./net-calorie-calculator";
import OhmsLawCalculator from "./ohms-law-calculator";
import OvertimePayCalculator from "./overtime-pay-calculator";
import OvulationCalculator from "./ovulation-calculator";
import PartialFractionCalculator from "./partial-fraction-calculator";
import PercentageCalculator from "./percentage-calculator";
import PermutationCombinationCalculator from "./permutation-combination-calculator";
import PetAgeCalculator from "./pet-age-calculator";
import PetCareCostCalculator from "./pet-care-cost-calculator";
import PowerConverter from "./power-converter";
import PregnancyDueDateCalculator from "./pregnancy-due-date-calculator";
import PressureConverter from "./pressure-converter";
import ProbabilityCalculator from "./probability-calculator";
import ProportionCalculator from "./proportion-calculator";
import PythagoreanTheoremCalculator from "./pythagorean-theorem-calculator";
import RatioCalculator from "./ratio-calculator";
import ReadingTimeCalculator from "./reading-time-calculator";
import RectangleAreaCalculator from "./rectangle-area-calculator";
import ResistorColorCodeCalculator from "./resistor-color-code-calculator";
import RetirementCalculator from "./retirement-calculator";
import RomanNumeralConverter from "./roman-numeral-converter";
import SalaryCalculator from "./salary-calculator";
import SavingsCalculator from "./savings-calculator";
import ScientificCalculator from "./scientific-calculator";
import SimpleInterestCalculator from "./simple-interest-calculator";
import SipCalculator from "./sip-calculator";
import SphereVolumeSurfaceAreaCalculator from "./sphere-volume-surface-area-calculator";
import SquareRootCubeRootCalculator from "./square-root-cube-root-calculator";
import StandardDeviationCalculator from "./standard-deviation-calculator";
import StockProfitLossCalculator from "./stock-profit-loss-calculator";
import TangentLineCalculator from "./tangent-line-calculator";
import TimeCardCalculator from "./time-card-calculator";
import TimeConverter from "./time-converter";
import TimeZoneConverter from "./time-zone-converter";
import TipCalculator from "./tip-calculator";
import TorqueCalculator from "./torque-calculator";
import TriangleAngleCalculator from "./triangle-angle-calculator";
import TriangleAreaCalculator from "./triangle-area-calculator";
import TrigonometryCalculator from "./trigonometry-calculator";
import TypingSpeedCalculator from "./typing-speed-calculator";
import UnitConverter from "./unit-converter";
import VatGstCalculator from "./vat-gst-calculator";
import Vo2MaxCalculator from "./vo2-max-calculator";
import VoltageToWattsCalculator from "./voltage-to-watts-calculator";
import WaterIntakeCalculator from "./water-intake-calculator";
import WeddingBudgetCalculator from "./wedding-budget-calculator";
import WeekNumberCalculator from "./week-number-calculator";
import WindChillCalculator from "./wind-chill-calculator";
import WorkingDaysCalculator from "./working-days-calculator";
import WorldClockCalculator from "./world-clock-calculator";
import AddSubtractDaysCalculator from "./add-subtract-days-calculator";

interface CalculatorProps {
  calculatorName: string;
  searchParams: ReadonlyURLSearchParams | null;
}

type CalculatorComponent = (props: CalculatorProps) => JSX.Element;

export const CalculatorMap: Record<string, CalculatorComponent> = {
  "age-calculator": AgeCalculator,
  "angle-converter": AngleConverter,
  "ascii-text-converter": AsciiTextConverter,
  "bac-calculator": BacCalculator,
  "base64-converter": Base64Converter,
  "basic-calculator": BasicCalculator,
  "beam-deflection-calculator": BeamDeflectionCalculator,
  "binary-converter": BinaryConverter,
  "bmi-calculator": BmiCalculator,
  "bmr-calculator": BmrCalculator,
  "body-fat-percentage-calculator": BodyFatPercentageCalculator,
  "break-even-point-calculator": BreakEvenPointCalculator,
  "business-day-calculator": BusinessDayCalculator,
  "business-profit-margin-calculator": BusinessProfitMarginCalculator,
  "calorie-needs-calculator": CalorieNeedsCalculator,
  "capacitor-charge-calculator": CapacitorChargeCalculator,
  "car-loan-calculator": CarLoanCalculator,
  "cgpa-calculator": CgpaCalculator,
  "circle-calculator": CircleCalculator,
  "color-converter": ColorConverter,
  "complex-number-calculator": ComplexNumberCalculator,
  "compound-interest-calculator": CompoundInterestCalculator,
  "concrete-slab-calculator": ConcreteSlabCalculator,
  "cone-volume-calculator": ConeVolumeCalculator,
  "countdown-timer": CountdownTimer,
  "crc-hash-generator": CrcHashGenerator,
  "credit-card-payoff-calculator": CreditCardPayoffCalculator,
  "cubic-equation-calculator": CubicEquationCalculator,
  "currency-converter": CurrencyConverter,
  "cylinder-volume-calculator": CylinderVolumeCalculator,
  "data-storage-converter": DataStorageConverter,
  "data-transfer-rate-converter": DataTransferRateConverter,
  "date-difference-calculator": DateDifferenceCalculator,
  "decimal-to-inches-calculator": DecimalToInchesCalculator,
  "discount-calculator": DiscountCalculator,
  "energy-converter": EnergyConverter,
  "equation-solver": EquationSolver,
  "exponent-power-calculator": ExponentPowerCalculator,
  "factorial-calculator": FactorialCalculator,
  "feet-and-inches-calculator": FeetAndInchesCalculator,
  "file-size-calculator": FileSizeCalculator,
  "fraction-calculator": FractionCalculator,
  "fraction-to-percentage-calculator": FractionToPercentageCalculator,
  "fuel-efficiency-converter": FuelEfficiencyConverter,
  "gpa-calculator": GpaCalculator,
  "grade-percentage-calculator": GradePercentageCalculator,
  "heart-rate-zone-calculator": HeartRateZoneCalculator,
  "ideal-weight-calculator": IdealWeightCalculator,
  "inflation-calculator": InflationCalculator,
  "intercept-calculator": InterceptCalculator,
  "investment-return-calculator": InvestmentReturnCalculator,
  "ip-subnet-calculator": IpSubnetCalculator,
  "lcm-gcd-calculator": LcmGcdCalculator,
  "lean-body-mass-calculator": LeanBodyMassCalculator,
  "loan-affordability-calculator": LoanAffordabilityCalculator,
  "loan-comparison-calculator": LoanComparisonCalculator,
  "loan-emi-calculator": LoanEMICalculator,
  "logarithm-calculator": LogarithmCalculator,
  "matrix-calculator": MatrixCalculator,
  "mean-median-mode-calculator": MeanMedianModeCalculator,
  "mixed-number-calculator": MixedNumberCalculator,
  "mortgage-calculator": MortgageCalculator,
  "net-calorie-calculator": NetCalorieCalculator,
  "ohms-law-calculator": OhmsLawCalculator,
  "overtime-pay-calculator": OvertimePayCalculator,
  "ovulation-calculator": OvulationCalculator,
  "partial-fraction-calculator": PartialFractionCalculator,
  "percentage-calculator": PercentageCalculator,
  "permutation-combination-calculator": PermutationCombinationCalculator,
  "pet-age-calculator": PetAgeCalculator,
  "pet-care-cost-calculator": PetCareCostCalculator,
  "power-converter": PowerConverter,
  "pregnancy-due-date-calculator": PregnancyDueDateCalculator,
  "pressure-converter": PressureConverter,
  "probability-calculator": ProbabilityCalculator,
  "proportion-calculator": ProportionCalculator,
  "pythagorean-theorem-calculator": PythagoreanTheoremCalculator,
  "ratio-calculator": RatioCalculator,
  "reading-time-calculator": ReadingTimeCalculator,
  "rectangle-area-calculator": RectangleAreaCalculator,
  "resistor-color-code-calculator": ResistorColorCodeCalculator,
  "retirement-calculator": RetirementCalculator,
  "roman-numeral-converter": RomanNumeralConverter,
  "salary-calculator": SalaryCalculator,
  "savings-calculator": SavingsCalculator,
  "scientific-calculator": ScientificCalculator,
  "simple-interest-calculator": SimpleInterestCalculator,
  "sip-calculator": SipCalculator,
  "sphere-volume-surface-area-calculator": SphereVolumeSurfaceAreaCalculator,
  "square-root-cube-root-calculator": SquareRootCubeRootCalculator,
  "standard-deviation-calculator": StandardDeviationCalculator,
  "stock-profit-loss-calculator": StockProfitLossCalculator,
  "tangent-line-calculator": TangentLineCalculator,
  "time-card-calculator": TimeCardCalculator,
  "time-converter": TimeConverter,
  "time-zone-converter": TimeZoneConverter,
  "tip-calculator": TipCalculator,
  "torque-calculator": TorqueCalculator,
  "triangle-angle-calculator": TriangleAngleCalculator,
  "triangle-area-calculator": TriangleAreaCalculator,
  "trigonometry-calculator": TrigonometryCalculator,
  "typing-speed-calculator": TypingSpeedCalculator,
  "unit-converter": UnitConverter,
  "vat-gst-calculator": VatGstCalculator,
  "vo2-max-calculator": Vo2MaxCalculator,
  "voltage-to-watts-calculator": VoltageToWattsCalculator,
  "water-intake-calculator": WaterIntakeCalculator,
  "wedding-budget-calculator": WeddingBudgetCalculator,
  "week-number-calculator": WeekNumberCalculator,
  "wind-chill-calculator": WindChillCalculator,
  "working-days-calculator": WorkingDaysCalculator,
  "world-clock-calculator": WorldClockCalculator,
  "add-subtract-days-calculator": AddSubtractDaysCalculator,
};
