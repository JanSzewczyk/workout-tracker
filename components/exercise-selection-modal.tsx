import { Modal, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useWorkoutStore } from "~/store/wokrout-store";

export type ExerciseSelectionModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function ExerciseSelectionModal({ onClose, visible }: ExerciseSelectionModalProps) {
  const router = useRouter();
  const {} = useWorkoutStore();

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <Text>XXX</Text>
    </Modal>
  );
}
