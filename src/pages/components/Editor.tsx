import React, { ChangeEvent, CSSProperties, useState } from "react";
import * as Select from "@radix-ui/react-select";
import * as Slider from "@radix-ui/react-slider";
import { Box } from "@radix-ui/themes";
import { ActivityLogIcon } from "@radix-ui/react-icons";
interface Styles {
  inputGroup: CSSProperties;
  label: CSSProperties;
  colorPicker: CSSProperties;
  sidebarContainer: CSSProperties;
  sectionLabel: React.CSSProperties;
  customSelectTrigger: React.CSSProperties;
  customSelectTriggers: React.CSSProperties;
  customSlider: React.CSSProperties;
  sliderTrack: React.CSSProperties;
  selectField: React.CSSProperties;
  selectItem: React.CSSProperties;
  selectItemHover: React.CSSProperties;
  textInput: React.CSSProperties;
  switchButton: React.CSSProperties;
  switchButtonActive: React.CSSProperties;
  sliderThumb: React.CSSProperties;
  viewButtons: React.CSSProperties;
  selectContent: React.CSSProperties;
  selectTrigger: React.CSSProperties;
}
const styles: Styles = {
  sidebarContainer: {
    width: "300px",
    backgroundColor: "#1b1b1d",
    color: "white",
    padding: "20px",
  },
  sectionLabel: {
    fontSize: "16px",
    fontWeight: 500,
    marginTop: "30px",
    marginBottom: "8px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "16px",
  },
  label: {
    width: "160px",
    fontSize: "14px",
    fontWeight: 500,
  },
  colorPicker: {
    width: "40px",
    height: "30px",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    marginLeft: "60px",
  },
  customSelectTrigger: {
    backgroundColor: "#333",
    color: "white",
    padding: "8px",
    borderRadius: "4px",
    fontSize: "14px",
    width: "120px",
    textAlign: "left",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  customSelectTriggers: {
    backgroundColor: "#333",
    color: "white",
    padding: "8px",
    borderRadius: "4px",
    fontSize: "14px",
    width: "220px",
    cursor: "pointer",
    alignItems: "center",
    marginTop: "80px",
  },
  customSlider: {
    display: "flex",
    alignItems: "center",
    width: "100px",
    margin: "4px 0",
  },
  sliderTrack: {
    backgroundColor: "#555",
    position: "relative",
    flexGrow: 1,
    height: "8px",
    borderRadius: "4px",
  },
  sliderThumb: {
    display: "block",
    width: "16px",
    height: "16px",
    backgroundColor: "#1b1b1d",
    borderRadius: "50%",
    cursor: "grab",
  },
  selectField: {
    backgroundColor: "#333",
    borderRadius: "4px",
    padding: "4px",
    marginTop: "4px",
  },
  selectItem: {
    color: "white",
    padding: "8px",
    cursor: "pointer",
  },
  selectItemHover: {
    backgroundColor: "#555",
  },
  textInput: {
    backgroundColor: "#333",
    color: "white",
    padding: "8px",
    border: "none",
    borderRadius: "4px",
    width: "60px",
    fontSize: "14px",
    textAlign: "center",
    marginLeft: "16px",
  },
  switchButton: {
    backgroundColor: "#333",
    border: "none",
    color: "white",
    padding: "8px",
    margin: "0 4px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    width: "40px",
  },
  switchButtonActive: {
    backgroundColor: "#2EE2AC",
  },
  viewButtons: {
    display: "flex",
  },
  selectTrigger: {
    backgroundColor: "#333",
    color: "white",
    padding: "8px 12px",
    borderRadius: "4px",
    fontSize: "14px",
    cursor: "pointer",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #444",
  },
  selectContent: {
    backgroundColor: "#333",
    borderRadius: "4px",
    border: "1px solid #444",
    marginTop: "4px",
    width: "100%",
  },
};

const Editor = () => {
  const [state, setState] = useState<string>("Normal");
  const [font, setFont] = useState<string>("Outfit");
  const [selectedOption, setSelectedOption] = useState<string>("Option 1");

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Box style={styles.sidebarContainer} className="overflow-y-auto">
      <Box style={styles.inputGroup}>
        <Box as="span" style={styles.sectionLabel}>
          STATE
        </Box>
        <Box>
          <select
            id="dropdown"
            value={selectedOption}
            onChange={handleChange}
            style={{
              marginTop: "100px",
              width: "240px",
              padding: "8px",
              borderRadius: "5px",
              marginLeft: "-40px",
            }}
          >
            <option value="Option 1">Normal</option>
            <option value="Option 2">Active</option>
            <option value="Option 3">Pending</option>
          </select>
        </Box>
      </Box>

      <Box style={styles.sectionLabel}>BACKGROUND</Box>
      <Box style={styles.inputGroup}>
        <Box as="span" style={styles.label}>
          Color
        </Box>
        <input type="color" style={styles.colorPicker} defaultValue="#FF0000" />
      </Box>

      <Box style={styles.inputGroup}>
        <Box as="span" style={styles.label}>
          Corner Radius
        </Box>
        <Box style={styles.customSlider}>
          <Slider.Root
            style={styles.customSlider}
            defaultValue={[6]}
            min={0}
            max={50}
          >
            <Slider.Thumb style={styles.sliderThumb} />
          </Slider.Root>
          <input type="number" style={styles.textInput} value="6" />
        </Box>
      </Box>

      <Box style={styles.inputGroup}>
        <Box as="span" style={styles.label}>
          Horizontal Skew
        </Box>
        <Box style={styles.customSlider}>
          <Slider.Root
            style={styles.customSlider}
            defaultValue={[0]}
            min={0}
            max={45}
          >
            <Slider.Thumb style={styles.sliderThumb} />
          </Slider.Root>
          <input type="number" style={styles.textInput} value="0" />
        </Box>
      </Box>

      <Box style={styles.inputGroup}>
        <Box as="span" style={styles.label}>
          Vertical Skew
        </Box>
        <div style={styles.customSlider}>
          <Slider.Root
            style={styles.customSlider}
            defaultValue={[0]}
            min={0}
            max={45}
          >
            <Slider.Thumb style={styles.sliderThumb} />
          </Slider.Root>
          <input type="number" style={styles.textInput} value="0" />
        </div>
      </Box>

      <Box style={styles.inputGroup}>
        <Box as="span" style={styles.label}>
          Border Width
        </Box>
        <Box style={styles.customSlider}>
          <Slider.Root
            style={styles.customSlider}
            defaultValue={[0]}
            min={0}
            max={10}
          >
            <Slider.Thumb style={styles.sliderThumb} />
          </Slider.Root>
          <input type="number" style={styles.textInput} value="0" />
        </Box>
      </Box>

      <Box style={styles.inputGroup}>
        <Box as="span" style={styles.label}>
          Border Color
        </Box>
        <input type="color" style={styles.colorPicker} defaultValue="#0000FF" />
      </Box>
      <Box style={styles.inputGroup}>
        <Box as="span" style={styles.label}>
          Shadow
        </Box>
        <input type="color" style={styles.colorPicker} defaultValue="#1110FF" />
      </Box>
      <Box style={styles.viewButtons}>
        <button
          style={{
            ...styles.switchButton,
            ...(state === "Normal" ? styles.switchButtonActive : {}),
          }}
          onClick={() => setState("Normal")}
        >
          <ActivityLogIcon />
        </button>
        <button
          style={{
            ...styles.switchButton,
            ...(state === "Hover" ? styles.switchButtonActive : {}),
          }}
          onClick={() => setState("Hover")}
        >
          <ActivityLogIcon />
        </button>
        <button
          style={{
            ...styles.switchButton,
            ...(state === "Active" ? styles.switchButtonActive : {}),
          }}
          onClick={() => setState("Active")}
        >
          <ActivityLogIcon />
        </button>
        <button
          style={{
            ...styles.switchButton,
            ...(state === "down" ? styles.switchButtonActive : {}),
          }}
          onClick={() => setState("down")}
        >
          <ActivityLogIcon />
        </button>
      </Box>

      {/* Text Section */}
      <Box style={styles.sectionLabel}>TEXT</Box>
      <Box style={styles.inputGroup}>
        <Box as="span" style={styles.label}>
          Color
        </Box>
        <input type="color" style={styles.colorPicker} defaultValue="#FFC0CB" />
      </Box>

      <Box style={styles.inputGroup}>
        <Box as="span" style={styles.label}>
          Font
        </Box>
        <Select.Root value={font} onValueChange={setFont}>
          <select
            id="dropdown"
            value={selectedOption}
            onChange={handleChange}
            style={styles.customSelectTrigger}
          >
            <option style={styles.selectItem} value="Option 1">
              Outfit
            </option>
            <option style={styles.selectItem} value="Option 2">
              Roboto
            </option>
          </select>
        </Select.Root>
      </Box>

      <Box style={styles.inputGroup}>
        <Box as="span" style={styles.label}>
          Size
        </Box>
        <Box style={styles.customSlider}>
          <Slider.Root
            style={styles.customSlider}
            defaultValue={[6]}
            min={6}
            max={72}
          >
            <Slider.Thumb style={styles.sliderThumb} />
          </Slider.Root>
          <input type="number" style={styles.textInput} value="6" />
        </Box>
      </Box>

      <Box style={styles.inputGroup}>
        <Box as="span" style={styles.label}>
          Line Height
        </Box>
        <Box style={styles.customSlider}>
          <Slider.Root
            style={styles.customSlider}
            defaultValue={[1]}
            min={1}
            max={3}
          >
            <Slider.Thumb style={styles.sliderThumb} />
          </Slider.Root>
          <input type="number" style={styles.textInput} value="1" />
        </Box>
      </Box>
      <Box style={styles.inputGroup}>
        <Box as="span" style={styles.label}>
          Letter spacing
        </Box>
        <Box style={styles.customSlider}>
          <Slider.Root
            style={styles.customSlider}
            defaultValue={[4]}
            min={1}
            max={3}
          >
            <Slider.Thumb style={styles.sliderThumb} />
          </Slider.Root>
          <input type="number" style={styles.textInput} value="1" />
        </Box>
      </Box>
      <Box style={styles.inputGroup}>
        <Box as="span" style={styles.label}>
          Boldness
        </Box>
        <Box style={styles.customSlider}>
          <Slider.Root
            style={styles.customSlider}
            defaultValue={[6]}
            min={1}
            max={3}
          >
            <Slider.Thumb style={styles.sliderThumb} />
          </Slider.Root>
          <input type="number" style={styles.textInput} value="1" />
        </Box>
      </Box>

      <Box style={styles.viewButtons}>
        <button
          style={{
            ...styles.switchButton,
            ...(state === "Normal" ? styles.switchButtonActive : {}),
          }}
          onClick={() => setState("Normal")}
        >
          <ActivityLogIcon />
        </button>
        <button
          style={{
            ...styles.switchButton,
            ...(state === "Hover" ? styles.switchButtonActive : {}),
          }}
          onClick={() => setState("Hover")}
        >
          <ActivityLogIcon />
        </button>
        <button
          style={{
            ...styles.switchButton,
            ...(state === "Active" ? styles.switchButtonActive : {}),
          }}
          onClick={() => setState("Active")}
        >
          <ActivityLogIcon />
        </button>
        <button
          style={{
            ...styles.switchButton,
            ...(state === "down" ? styles.switchButtonActive : {}),
          }}
          onClick={() => setState("down")}
        >
          <ActivityLogIcon />
        </button>
      </Box>
      <Box style={styles.sectionLabel}>VIEW</Box>
    </Box>
  );
};

export default Editor;
