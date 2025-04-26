import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  language: text("language").default("en").notNull(),
  score: integer("score").default(0).notNull(),
  completedScenarios: text("completed_scenarios").array().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Category model
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  riskLevel: text("risk_level").notNull(),
  iconName: text("icon_name").notNull(),
});

// Scenario model
export const scenarios = pgTable("scenarios", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  categoryId: integer("category_id").notNull(),
  contactName: text("contact_name").notNull(),
  contactStatus: text("contact_status").notNull().default("online"),
  iconName: text("icon_name").notNull().default("message-circle"),
  messages: jsonb("messages").notNull(),
  options: jsonb("options").notNull(),
  outcomes: jsonb("outcomes").notNull(),
});

// Resources model
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // video, article, link
  url: text("url").notNull(),
  source: text("source").notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export const insertScenarioSchema = createInsertSchema(scenarios).omit({
  id: true,
});

export const insertResourceSchema = createInsertSchema(resources).omit({
  id: true,
});

// Type definitions
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Scenario = typeof scenarios.$inferSelect;
export type InsertScenario = z.infer<typeof insertScenarioSchema>;

export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;

// Custom types for scenario content
export type Message = {
  id: string;
  sender: 'contact' | 'user' | 'system';
  content: string;
  timestamp?: string;
  attachment?: {
    type: string;
    name: string;
  };
};

export type Option = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type Outcome = {
  id: string;
  title: string;
  description: string;
  isCorrect: boolean;
  explanation: string[];
  advice: string;
};
