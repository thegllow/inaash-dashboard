import {
  Badge,
  Button,
  createTheme,
  Input,
  Menu,
  PasswordInput,
  rem,
  Table,
  TableTd,
  TableTh,
  TableThead,
  TextInput,
} from "@mantine/core"

const primary = [
  "#f6ebff",
  "#e5d5fd",
  "#c7a8f4",
  "#a878ec",
  "#8d50e5",
  "#7c36e1",
  "#9156E6",
  "#621cc8",
  "#5717b3",
  "#4a109e",
] as const
const secondary = [
  "#e2ffff",
  "#d1fafb",
  "#a7f4f4",
  "#79edee",
  "#55e7e8",
  "#3fe4e5",
  "#2ee2e3",
  "#19c9ca",
  "#00b3b4",
  "#009b9c",
] as const

const gray = [
  "#f5f5f5",
  "#e7e7e7",
  "#cdcdcd",
  "#b2b2b2",
  "#9a9a9a",
  "#8b8b8b",
  "#848484",
  "#717171",
  "#656565",
  "#575757",
] as const

export const theme = createTheme({
  black: "#1A1B1C",

  colors: {
    primary,
    secondary,
    gray,
  },

  fontFamily: "MyCustomFont, san-serf",
  fontFamilyMonospace: "Monaco, Courier, monospace",
  primaryColor: "primary",
  radius: {
    sm: "0.35rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "2rem",
  },

  components: {
    Table: Table.extend({
      defaultProps: {
        color: "primary",
        highlightOnHover: true,
        verticalSpacing: "sm",
      },
    }),
    TableThead: TableThead.extend({
      defaultProps: {
        bg: "gray.1",
      },
    }),
    TableTh: TableTh.extend({
      defaultProps: {
        fw: 400,
      },
    }),
    TableTd: TableTd.extend({
      defaultProps: {
        c: "gray",
      },
    }),
    Badge: Badge.extend({
      defaultProps: {
        size: "md",
        radius: "xl",
        variant: "light",
        fw: 600,
      },
    }),
    Menu: Menu.extend({
      defaultProps: {
        classNames: {
          dropdown: "menu-dropdown",
          label: "menu-label",
          item: "menu-item",
        },
        shadow: "lg",
      },
    }),
    Input: Input.extend({
      defaultProps: {
        size: "md",
        // classNames(theme, props, ctx) {
        //   const isFilled = props.variant === "filled"
        //   if (!isFilled) return {}

        //   return {
        //     input: "!bg-white",
        //   }
        // },
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        styles: {
          label: {
            fontWeight: 400,
            color: "#5A5A5A",
            marginBottom: "6px",
          },
        },
        size: "lg",
      },
    }),
    PasswordInput: PasswordInput.extend({
      defaultProps: {
        styles: {
          label: {
            fontWeight: 400,
            color: "#5A5A5A",
            marginBottom: "6px",
          },
        },
        size: "lg",
      },
    }),

    Button: Button.extend({
      defaultProps: {
        fw: 400,
        size: "md",
      },
    }),
  },
  defaultRadius: "md",
  fontSizes: {
    xs: rem(11),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20),
    "2xl": rem(28),
  },
  headings: {
    fontWeight: "600",
    sizes: {
      h1: {
        fontSize: rem(36),
      },
      h2: {
        fontSize: rem(30),
      },
    },
  },
})
