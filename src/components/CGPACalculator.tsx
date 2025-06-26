
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calculator, BookOpen, Award } from "lucide-react";

interface CGPACalculatorProps {
  department: string;
}

const gradePoints = {
  "S": 10.0,
  "A+": 9.0,
  "A": 8.5,
  "B+": 8.0,
  "B": 7.5,
  "C+": 7.0,
  "C": 6.5,
  "D": 6.0,
  "P": 5.5,
  "F": 0.0,
  "FE": 0.0,
  "I": 0.0,
  "AB": 0.0
};

const departmentCourses = {
  cs: {
    "Ordinary Differential Equations and Transforms": 4,
    "Computer Aided Engineering Graphics": 3,
    "Logic System Design": 4,
    "Industrial Programming": 3,
    "Object Oriented Programming": 4,
    "Industrial Programming Lab": 2,
    "Object Oriented Programming Lab": 2,
    "Professional Communication & Ethics": 0,
    "IDEA Lab": 0
  },
  mech: {
    "Ordinary Differential Equations and Transforms": 4,
    "Engineering Physics (B)": 3,
    "Engineering Chemistry (A)": 3,
    "Fundamentals of Electronics Engineering": 3,
    "Statics and Dynamics for Engineers": 4,
    "Electrical and Electronics Workshop": 1,
    "Computer Aided Machine Drawing": 3,
    "Physics & Chemistry Lab (combined)": 1
  },
  eee: {
    "Ordinary Differential Equations and Transforms": 4,
    "Engineering Physics (A)": 3,
    "Engineering Chemistry (A)": 3,
    "Basic Civil and Mechanical Engineering (A)": 4,
    "Electrical Measurements": 3,
    "Basic Civil and Mechanical Workshop (A)": 1,
    "Electronic Circuits Lab I": 2,
    "Physics and Chemistry Lab (combined)": 1
  },
  civil: {
    "Ordinary Differential Equations and Transforms": 4,
    "Engineering Physics": 3,
    "Engineering Chemistry": 3,
    "Basic Electrical and Mechanical Engineering": 4,
    "Surveying & Geomatics": 3,
    "Mechanical and Electrical Engineering Workshop": 1,
    "Engineering Mechanics Lab": 2,
    "Physics and Chemistry Lab (combined)": 1
  },
  ece: {
    "Ordinary Differential Equations and Transforms": 4,
    "Computer Aided Engineering Graphics": 3,
    "Electrical Circuit Theory": 4,
    "Logic Circuit Design": 3,
    "Analog Circuits": 4,
    "Basic Electronics Lab": 2,
    "Scientific Computing Lab": 2
  }
};

const CGPACalculator = ({ department }: CGPACalculatorProps) => {
  const [grades, setGrades] = useState<Record<string, string>>({});
  const [calculatedSGPA, setCalculatedSGPA] = useState<number | null>(null);
  
  const courses = departmentCourses[department as keyof typeof departmentCourses];
  
  const handleGradeChange = (course: string, grade: string) => {
    setGrades(prev => ({
      ...prev,
      [course]: grade
    }));
  };

  const calculateSGPA = () => {
    let totalCredits = 0;
    let totalWeightedPoints = 0;

    Object.entries(courses).forEach(([course, credit]) => {
      const grade = grades[course];
      if (grade && grade in gradePoints) {
        const gp = gradePoints[grade as keyof typeof gradePoints];
        totalCredits += credit;
        totalWeightedPoints += gp * credit;
      }
    });

    if (totalCredits > 0) {
      const sgpa = totalWeightedPoints / totalCredits;
      setCalculatedSGPA(sgpa);
    }
  };

  const getSGPAColor = (sgpa: number) => {
    if (sgpa >= 9.0) return "from-green-500 to-emerald-500";
    if (sgpa >= 8.0) return "from-blue-500 to-cyan-500";
    if (sgpa >= 7.0) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  const getSGPAGrade = (sgpa: number) => {
    if (sgpa >= 9.0) return "Outstanding";
    if (sgpa >= 8.0) return "Excellent";
    if (sgpa >= 7.0) return "Good";
    if (sgpa >= 6.0) return "Average";
    return "Below Average";
  };

  const allGradesEntered = Object.keys(courses).every(course => grades[course]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Enter Your Grades
          </CardTitle>
          <CardDescription>
            Select your grade for each subject. Grades marked with * are Pass/Fail subjects.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {Object.entries(courses).map(([course, credit]) => (
              <div key={course} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1 mb-2 sm:mb-0">
                  <h4 className="font-medium text-gray-900">{course}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {credit === 0 ? "P/F" : `${credit} Credits`}
                    </Badge>
                  </div>
                </div>
                <Select 
                  value={grades[course] || ""} 
                  onValueChange={(value) => handleGradeChange(course, value)}
                >
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(gradePoints).map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade} ({gradePoints[grade as keyof typeof gradePoints]})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <Button 
              onClick={calculateSGPA}
              disabled={!allGradesEntered}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              size="lg"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Calculate SGPA
            </Button>
          </div>
        </CardContent>
      </Card>

      {calculatedSGPA !== null && (
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Award className="w-5 h-5" />
              Your SGPA Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r ${getSGPAColor(calculatedSGPA)} text-white shadow-lg mb-4`}>
                <span className="text-3xl font-bold">{calculatedSGPA.toFixed(2)}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Grade: {getSGPAGrade(calculatedSGPA)}
              </h3>
              <p className="text-gray-600">
                Total Credits: {Object.values(courses).reduce((sum, credit) => sum + credit, 0)}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800 mb-3">Grade Summary:</h4>
              {Object.entries(courses).map(([course, credit]) => {
                const grade = grades[course];
                return (
                  <div key={course} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
                    <span className="text-sm text-gray-700">{course}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{grade}</Badge>
                      <span className="text-xs text-gray-500">
                        {credit === 0 ? "P/F" : `${credit}cr`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CGPACalculator;
