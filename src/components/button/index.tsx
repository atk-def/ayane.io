import clsx from "clsx";
import { HTMLMotionProps, motion } from "framer-motion";
import { forwardRef, ReactNode } from "react";
import styles from "./index.module.css";

export type ButtonProps = {
  children?: ReactNode;
} & HTMLMotionProps<"button">;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, children, disabled, ...rest } = props;
    return (
      <motion.button
        ref={ref}
        className={clsx(styles.button, disabled && styles.disabled, className)}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.05 }}
        {...rest}
      >
        {children}
      </motion.button>
    );
  }
);
