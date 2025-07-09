import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import {
  LogIn,
  Building2,
  MapPin,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    const success = await login(email, password);
    if (success) {
      // Redirect will be handled by the route protection
      navigate("/dashboard");
    } else {
      setError("Email ou mot de passe incorrect");
    }
  };

  const demoAccounts = [
    {
      type: "Administrateur National",
      email: "admin@ministere-tourisme.mg",
      password: "admin123",
      role: "Ministère",
      icon: Building2,
    },
    {
      type: "Directeur Régional - Atsinanana",
      email: "directeur.atsinanana@region.mg",
      password: "region123",
      role: "Région",
      icon: MapPin,
    },
    {
      type: "Directeur Régional - Boeny",
      email: "directeur.boeny@region.mg",
      password: "region123",
      role: "Région",
      icon: MapPin,
    },
  ];

  const fillDemoAccount = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-4">
            <Building2 className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Ministère du Tourisme
          </h1>
          <p className="text-gray-600 mt-2">
            Plateforme de gestion des projets touristiques et artisanaux
          </p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Connexion</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre.email@ministere.mg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Votre mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Connexion en cours...
                  </div>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Se connecter
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">
                Comptes de démonstration
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDemoAccounts(!showDemoAccounts)}
              >
                {showDemoAccounts ? "Masquer" : "Afficher"}
              </Button>
            </div>
          </CardHeader>
          {showDemoAccounts && (
            <CardContent className="space-y-3">
              {demoAccounts.map((account, index) => (
                <div
                  key={index}
                  className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() =>
                    fillDemoAccount(account.email, account.password)
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <account.icon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{account.type}</p>
                        <p className="text-xs text-muted-foreground">
                          {account.email}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        account.role === "Ministère" ? "default" : "secondary"
                      }
                    >
                      {account.role}
                    </Badge>
                  </div>
                </div>
              ))}
              <p className="text-xs text-muted-foreground text-center">
                Cliquez sur un compte pour remplir automatiquement les champs
              </p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
