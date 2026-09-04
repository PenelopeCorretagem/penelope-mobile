import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useEffect, useRef } from "react";
import { colors, spacing } from "@shared/styles/style";
import Section from "@shared/components/layout/Section";
import ButtonView from "@shared/components/ui/Button";
import Logo from "@shared/components/ui/Logo";
import Text from "@shared/components/ui/Text";

export type AuthInputField = {
  key: string;
  label: string;
  placeholder: string;
  value: string;
  type?: "text" | "date";
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: "default" | "email-address";
  error?: string;
  onChangeText: (value: string) => void;
};

type AuthScreenProps = {
  title: string;
  subtitle: string;
  fields: AuthInputField[];
  submitText: string;
  isSubmitting: boolean;
  onSubmit: () => void;
  onNext?: () => void;
  onBack?: () => void;
  isLastStep?: boolean;
  step?: number;
  totalSteps?: number;
  helperLabel?: string;
  helperHref?: string;
  helperActionLabel?: string;
  secondaryPrompt?: string;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
  //   asideTitle: string
  //   asideDescription: string
  //   asideActionLabel: string
  //   asideActionHref: string
};

export default function AuthScreenView({
  title,
  subtitle,
  fields,
  submitText,
  isSubmitting,
  onSubmit,
  onNext,
  onBack,
  isLastStep = true,
  step,
  totalSteps,
  helperLabel,
  helperHref = "/login",
  helperActionLabel,
  secondaryPrompt,
  secondaryActionLabel,
  secondaryActionHref,
  //   asideTitle,
  //   asideDescription,
  //   asideActionLabel,
  //   asideActionHref,
}: AuthScreenProps) {
  const [activeDateField, setActiveDateField] = useState<string | null>(null);
  const slideX = useRef(new Animated.Value(0)).current;
  const fieldKeys = fields.map((field) => field.key).join("|");

  useEffect(() => {
    slideX.setValue(Dimensions.get("window").width);
    Animated.timing(slideX, {
      toValue: 0,
      duration: 280,
      useNativeDriver: true,
    }).start();
  }, [fieldKeys, slideX]);

  const handleDateValueChange = (field: AuthInputField, selectedDate: Date) => {
    if (Platform.OS !== "ios") setActiveDateField(null);

    const day = String(selectedDate.getDate()).padStart(2, "0");
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    field.onChangeText(`${day}/${month}/${selectedDate.getFullYear()}`);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.screen}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Section style={styles.formPanel}>
          <Logo width={160} height={62} color={colors.primary} style={styles.logo} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          {step && totalSteps ? (
            <Text style={styles.stepIndicator}>
              Etapa {step} de {totalSteps}
            </Text>
          ) : null}

          <Animated.View style={{ transform: [{ translateX: slideX }], width: "100%" }}>
            {fields.map((field) => (
              <View key={field.key} style={styles.fieldGroup}>
                <Text style={styles.label}>{field.label}</Text>
                {field.type === "date" ? (
                  <>
                    <Pressable
                      accessibilityRole="button"
                      onPress={() => setActiveDateField(field.key)}
                      style={[styles.input, field.error ? styles.inputError : null]}
                    >
                      <Text style={field.value ? styles.inputText : styles.placeholderText}>
                        {field.value || field.placeholder}
                      </Text>
                    </Pressable>
                    {activeDateField === field.key ? (
                      <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display={Platform.OS === "ios" ? "spinner" : "default"}
                        maximumDate={new Date()}
                        onValueChange={(_, selectedDate) =>
                          handleDateValueChange(field, selectedDate)
                        }
                        onDismiss={() => setActiveDateField(null)}
                        onNeutralButtonPress={() => setActiveDateField(null)}
                      />
                    ) : null}
                  </>
                ) : (
                  <TextInput
                    value={field.value}
                    placeholder={field.placeholder}
                    placeholderTextColor={colors.mutedText}
                    secureTextEntry={field.secureTextEntry}
                    autoCapitalize={field.autoCapitalize ?? "none"}
                    keyboardType={field.keyboardType ?? "default"}
                    onChangeText={field.onChangeText}
                    style={[styles.input, field.error ? styles.inputError : null]}
                  />
                )}
                {field.error ? (
                  <Text style={styles.errorText}>{field.error}</Text>
                ) : null}
              </View>
            ))}

            <View style={styles.actionsRow}>
              {onBack ? (
                <Pressable onPress={onBack} style={styles.backButton}>
                  <Text style={styles.backButtonText}>Voltar</Text>
                </Pressable>
              ) : null}
              <ButtonView
                onPress={isLastStep ? onSubmit : onNext}
                disabled={isSubmitting}
                label={isSubmitting ? "Enviando..." : isLastStep ? submitText : "Continuar"}
                style={[
                  styles.primaryButton,
                  !isLastStep && styles.primaryButtonWithBack,
                  isSubmitting && styles.primaryButtonDisabled,
                ]}
              />
            </View>
          </Animated.View>

          {helperLabel && helperActionLabel ? (
            <View style={styles.inlineLinkRow}>
              <Text style={styles.inlineText}>{helperLabel}</Text>
              <Pressable onPress={() => router.push(helperHref)}>
                <Text style={styles.linkText}>{helperActionLabel}</Text>
              </Pressable>
            </View>
          ) : null}

          {secondaryPrompt && secondaryActionLabel && secondaryActionHref ? (
            <View style={styles.inlineLinkRow}>
              <Text style={styles.inlineText}>{secondaryPrompt}</Text>
              <Pressable onPress={() => router.push(secondaryActionHref)}>
                <Text style={styles.linkText}>{secondaryActionLabel}</Text>
              </Pressable>
            </View>
          ) : null}
        </Section>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    width: "100%",
  },
  formPanel: {
    flex: 1,
    backgroundColor: colors.white,
    width: "100%",
  },
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 16,
    marginBottom: spacing.xl,
  },
  stepIndicator: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: spacing.md,
  },
  fieldGroup: {
    marginBottom: spacing.md,
    width: "100%",
  },
  logo: {
    marginBottom: spacing.xl,
  },
  label: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: spacing.sm,
    width: "100%",
    textAlign: "left",
  },
  input: {
    backgroundColor: "#f5f2f2",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e3dfe0",
    color: colors.text,
    fontSize: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    width: "100%",
    textAlign: "left",
  },
  inputText: {
    color: colors.text,
    fontSize: 16,
    textAlign: "left",
  },
  placeholderText: {
    color: colors.mutedText,
    fontSize: 16,
    textAlign: "left",
  },
  inputError: {
    borderColor: colors.error,
    backgroundColor: "#fff5f5",
    textAlign: "left",
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 6,
    marginLeft: 2,
    textAlign: "left",
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    marginTop: spacing.md,
    paddingVertical: spacing.md,
    alignItems: "center",
    width: "100%",
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  primaryButtonWithBack: {
    flex: 1,
  },
  backButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  backButtonText: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: "700",
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  inlineLinkRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.md,
    flexWrap: "wrap",
    width: "100%",
    gap: spacing.sm,
  },
  inlineText: {
    color: colors.secondary,
    fontSize: 14,
  },
  linkText: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 14,
  },
  sidePanel: {
    width: "40%",
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    justifyContent: "center",
    alignItems: "center",
  },
  sideTitle: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  sideDescription: {
    color: "#f5e8ef",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  sideButton: {
    borderWidth: 1,
    borderColor: colors.white,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 999,
  },
  sideButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
