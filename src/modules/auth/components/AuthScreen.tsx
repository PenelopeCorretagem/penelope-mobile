import { Link } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { colors, spacing } from "@shared/styles/style";

export type AuthInputField = {
  key: string;
  label: string;
  placeholder: string;
  value: string;
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

export function AuthScreen({
  title,
  subtitle,
  fields,
  submitText,
  isSubmitting,
  onSubmit,
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
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.screen}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* <View style={styles.authShell}> */}
        <View style={styles.formPanel}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          {fields.map((field) => (
            <View key={field.key} style={styles.fieldGroup}>
              <Text style={styles.label}>{field.label}</Text>
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
              {field.error ? (
                <Text style={styles.errorText}>{field.error}</Text>
              ) : null}
            </View>
          ))}

          <Pressable
            accessibilityRole="button"
            onPress={onSubmit}
            disabled={isSubmitting}
            style={[
              styles.primaryButton,
              isSubmitting && styles.primaryButtonDisabled,
            ]}
          >
            <Text style={styles.primaryButtonText}>
              {isSubmitting ? "Enviando..." : submitText}
            </Text>
          </Pressable>

          {helperLabel && helperActionLabel ? (
            <View style={styles.inlineLinkRow}>
              <Text style={styles.inlineText}>{helperLabel}</Text>
              <Link href={helperHref} asChild>
                <Pressable>
                  <Text style={styles.linkText}>{helperActionLabel}</Text>
                </Pressable>
              </Link>
            </View>
          ) : null}

          {secondaryPrompt && secondaryActionLabel && secondaryActionHref ? (
            <View style={styles.inlineLinkRow}>
              <Text style={styles.inlineText}>{secondaryPrompt}</Text>
              <Link href={secondaryActionHref} asChild>
                <Pressable>
                  <Text style={styles.linkText}>{secondaryActionLabel}</Text>
                </Pressable>
              </Link>
            </View>
          ) : null}
        </View>

        {/* <View style={styles.sidePanel}>
            <Text style={styles.sideTitle}>{asideTitle}</Text>
            <Text style={styles.sideDescription}>{asideDescription}</Text>

            <Link href={asideActionHref} asChild>
              <Pressable style={styles.sideButton}>
                <Text style={styles.sideButtonText}>{asideActionLabel}</Text>
              </Pressable>
            </Link>
          </View> */}
        {/* </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  // authShell: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   minHeight: 680,
  // },
  formPanel: {
    flex: 1,
    width: "100%",
    maxWidth: 520,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    justifyContent: "center",
  },
  title: {
    color: colors.secondary,
    fontSize: 32,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 16,
    marginBottom: spacing.xl,
  },
  fieldGroup: {
    marginBottom: spacing.md,
  },
  label: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: spacing.sm,
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
  },
  inputError: {
    borderColor: colors.error,
    backgroundColor: "#fff5f5",
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 6,
    marginLeft: 2,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    marginTop: spacing.md,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  primaryButtonDisabled: {
    opacity: 0.7,
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
    gap: 6,
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
