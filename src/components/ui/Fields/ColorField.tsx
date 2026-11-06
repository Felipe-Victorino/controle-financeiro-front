import { ColorPicker, Field, HStack, parseColor, Portal } from "@chakra-ui/react";

type ColorFieldProps = {
    label: string;
    value: string;
    onChange: (hex: string) => void;
};

export const ColorField = ({ label, value, onChange }: ColorFieldProps) => (
    <Field.Root>
        <ColorPicker.Root
            value={parseColor(value)}
            onValueChange={(e) => onChange(e.valueAsString)}
            maxW="200px"
        >
            <ColorPicker.HiddenInput />
            <ColorPicker.Label>{label}</ColorPicker.Label>
            <ColorPicker.Control>
                <ColorPicker.Input />
                <ColorPicker.Trigger />
            </ColorPicker.Control>
            <Portal>
                <ColorPicker.Positioner>
                    <ColorPicker.Content>
                        <ColorPicker.Area />
                        <HStack>
                            <ColorPicker.Sliders />
                        </HStack>
                    </ColorPicker.Content>
                </ColorPicker.Positioner>
            </Portal>
        </ColorPicker.Root>
    </Field.Root>
);