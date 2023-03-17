import clsx from "clsx";
import { FC, ReactNode } from "react";
import styles from "./index.module.css";
import { motion, HTMLMotionProps } from "framer-motion";
import { toggleAnimationVariants } from "utils/anim";

export type CardProps = {
  children?: ReactNode;
  badge?: ReactNode;
} & HTMLMotionProps<"div">;

export const Card: FC<CardProps> = (props) => {
  const { className, children, badge, ...rest } = props;
  return (
    <motion.div
      className={clsx(styles.card, className)}
      variants={toggleAnimationVariants.fadeFromBottom}
      {...rest}
    >
      {children}
      {badge && <div className={styles["card-badge"]}>{badge}</div>}
    </motion.div>
  );
};
