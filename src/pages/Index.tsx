
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, GraduationCap, BookOpen } from "lucide-react";
import CGPACalculator from "@/components/CGPACalculator";

const Index = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");

  const departments = [
    {
      id: "cs",
      name: "Computer Science & Engineering",
      color: "from-blue-500 to-cyan-500",
      icon: <Calculator className="w-6 h-6" />
    },
    {
      id: "mech",
      name: "Mechanical Engineering", 
      color: "from-orange-500 to-red-500",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      id: "eee",
      name: "Electrical & Electronics Engineering",
      color: "from-yellow-500 to-orange-500", 
      icon: <GraduationCap className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <GraduationCap className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SGPA Calculator
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate your Semester Grade Point Average for CS, Mechanical, and EEE departments
          </p>
        </div>

        {!selectedDepartment ? (
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Select Your Department</CardTitle>
                <CardDescription>Choose your department to get started with SGPA calculation</CardDescription>
              </CardHeader>
            </Card>
            
            <div className="grid md:grid-cols-3 gap-6">
              {departments.map((dept) => (
                <Card 
                  key={dept.id}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 hover:border-transparent"
                  onClick={() => setSelectedDepartment(dept.id)}
                >
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${dept.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {dept.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                      {dept.name}
                    </h3>
                    <Button 
                      className={`w-full bg-gradient-to-r ${dept.color} hover:shadow-lg transition-all duration-300`}
                    >
                      Calculate SGPA
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                {departments.find(d => d.id === selectedDepartment)?.name} - Semester 2
              </h2>
              <Button 
                variant="outline"
                onClick={() => setSelectedDepartment("")}
                className="hover:bg-blue-50"
              >
                Change Department
              </Button>
            </div>
            <CGPACalculator department={selectedDepartment} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
