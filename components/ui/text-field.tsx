import { Ionicons } from "@expo/vector-icons";
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import { clsx } from "clsx";
import * as React from "react";

type IconName = keyof typeof Ionicons.glyphMap;

export type TextFieldProps = TextInputProps & {
  label?: string;
  icon?: IconName;
  error?: string;
  description?: string;
  showClearButton?: boolean;
  onRemoveText?: () => void;
};

export function TextField({
  label,
  icon,
  error,
  description,
  onRemoveText,
  showClearButton,
  ...props
}: TextFieldProps) {
  return (
    <View>
      {label ? <Text className="mb-2 text-sm font-medium text-gray-700">{label}</Text> : null}
      <View
        className={clsx(
          "flex-row items-center rounded-xl border px-4 py-2",
          error ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"
        )}
      >
        <Ionicons name={icon} size={20} color={error ? "#ef4444" : "#6b7280"} />
        <TextInput {...props} className="ml-3 flex-1 text-gray-900" placeholderClassName="text-gray-400" />
        {showClearButton ? (
          <TouchableOpacity onPress={onRemoveText}>
            <Ionicons name="close-circle" size={20} color={error ? "#ef4444" : "#6b7280"} />
          </TouchableOpacity>
        ) : null}
      </View>
      {description ? <Text className="mt-1 text-sm text-gray-500">{description}</Text> : null}
      {error ? <Text className="mt-1 text-sm text-red-500">{error}</Text> : null}
    </View>
  );
}
