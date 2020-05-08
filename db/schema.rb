# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_06_013327) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ingredients", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "menu_item_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["menu_item_id"], name: "index_ingredients_on_menu_item_id"
  end

  create_table "menu_items", force: :cascade do |t|
    t.string "name", null: false
    t.integer "price", null: false
    t.string "category", null: false
    t.bigint "restaurant_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["restaurant_id"], name: "index_menu_items_on_restaurant_id"
  end

  create_table "picked_entrees", force: :cascade do |t|
    t.boolean "saved", default: true
    t.boolean "visited", default: false
    t.bigint "selected_menu_option_id", null: false
    t.bigint "menu_item_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["menu_item_id"], name: "index_picked_entrees_on_menu_item_id"
    t.index ["selected_menu_option_id"], name: "index_picked_entrees_on_selected_menu_option_id"
    t.index ["user_id"], name: "index_picked_entrees_on_user_id"
  end

  create_table "restaurants", force: :cascade do |t|
    t.string "restaurant_id", null: false
    t.string "name", null: false
    t.string "cuisine"
    t.float "rating"
    t.float "lat"
    t.float "lon"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["restaurant_id"], name: "index_restaurants_on_restaurant_id", unique: true
  end

  create_table "reviews", force: :cascade do |t|
    t.float "rating", null: false
    t.string "comments"
    t.bigint "user_id"
    t.bigint "menu_item_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["menu_item_id"], name: "index_reviews_on_menu_item_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "selected_menu_options", force: :cascade do |t|
    t.float "lat"
    t.float "lon"
    t.integer "zip_code"
    t.integer "radius"
    t.float "rating"
    t.string "cuisine"
    t.float "price"
    t.string "category"
    t.string "ingredients"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_selected_menu_options_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "user_name", null: false
    t.string "phone_number", null: false
    t.integer "zip_code", null: false
    t.boolean "admin", default: false, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["user_name"], name: "index_users_on_user_name", unique: true
  end

end
