
import RegistrationForm from "@/components/RegistrationForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
              <img 
                src="https://vikasanatech.in/wp-content/uploads/2024/01/VIKASANA-removebg-preview.png" 
                alt="Vikasana Logo" 
                className="h-16 w-auto"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              VIKASANA
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-2">
              Student Satellite Team
            </p>
            <p className="text-lg text-blue-300 max-w-2xl mx-auto">
              Join India's premier student satellite development program. Build the future of space technology with us.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20">
            <RegistrationForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
