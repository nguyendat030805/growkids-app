import { useNavigation, CommonActions } from "@react-navigation/native";
import { Lock, Mail } from "lucide-react-native";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

import { Button, ButtonText } from "@/components/ui/button";

import AuthHeader from "../components/AuthHeader";
import IconInput from "../components/IconInput";
import { useLogin } from "../hooks/useLogin";
import { useValidation } from "../hooks/useValidation";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const { handleLogin, loading, error } = useLogin();
  const { validateEmail, validatePassword } = useValidation();
  const navigation = useNavigation();

  const validateForm = () => {
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError("Email is not valid");
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError(null);
    }

    return isValid;
  };

  const handleSignIn = async () => {
    if (!validateForm()) {
      return;
    }
    const success = await handleLogin(email, password);
    if (success) {
      alert("Login successful");
      navigation.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name: "Onboarding" }] }),
      );
    } else {
      alert(`Login failed: ${error}`);
    }
  };
  return (
    <View className="flex-1 bg-yellow-400 items-center justify-start">
      <AuthHeader
        image={require("@/public/assets/images/login-boy.png")}
        title="Hi There!"
        subtitle="Sign in to continue"
      />
      <View className="mt-10 w-full">
        <View className="bg-white rounded-t-3xl px-6 py-8 h-full">
          <Text className="mb-8 text-4xl font-bold text-yellow-400 text-center">
            Sign in
          </Text>
          <IconInput
            icon={Mail}
            placeholder="Your email"
            className="mb-1"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (emailError && validateEmail(text)) {
                setEmailError(null);
              }
            }}
            onBlur={() => {
              if (!validateEmail(email)) {
                setEmailError("Email is not valid");
              }
            }}
            error={emailError}
          />

          <IconInput
            icon={Lock}
            placeholder="Your password"
            secureTextEntry
            className="mb-1"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError && validatePassword(text)) {
                setPasswordError(null);
              }
            }}
            onBlur={() => {
              if (!validatePassword(password)) {
                setPasswordError("Password must be at least 6 characters");
              }
            }}
            error={passwordError}
          />

          <Button
            className="bg-yellow-500 rounded-full h-14"
            onPress={handleSignIn}
          >
            <ButtonText className="text-white font-semibold text-base text-xl">
              Sign in
            </ButtonText>
          </Button>

          <Text className="text-center text-gray-400 my-4">Or</Text>

          <Pressable className="border border-gray-300 rounded-full py-3 flex-row items-center justify-center h-14">
            <Image
              source={require("@/public/assets/images/google.png")}
              className="w-5 h-5 mr-2"
            />
            <Text className="text-gray-700">Continue with Google</Text>
          </Pressable>

          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-500">Don&apos;t have an account?</Text>
            <Pressable>
              <Text className="text-blue-500 ml-1 font-medium">Sign up</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
