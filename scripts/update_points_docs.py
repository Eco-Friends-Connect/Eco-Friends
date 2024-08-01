import sys
import re
from pathlib import Path

def update_points(username, points, action):
    file_path = Path("docs/team-points.md")

    # Create the file if it doesn't exist
    if not file_path.exists():
        with open(file_path, "w") as f:
            f.write("# Team Points\n\n")
            f.write("| Username | Points | Tickets Claimed | Tickets Completed | Quality | Bonus Points |\n")
            f.write("|----------|--------|------------------|-------------------|---------|--------------|\n")

    # Read existing lines
    with open(file_path, "r") as f:
        lines = f.readlines()

    # Find the header index
    header_index = lines.index("|----------|--------|------------------|-------------------|---------|--------------|\n")

    # Initialize user line variable
    user_line = None
    for i, line in enumerate(lines[header_index+1:], start=header_index+1):
        if line.startswith(f"| {username} "):
            user_line = i
            break

    # Update points or add new user line
    if user_line is not None:
        user_line_data = lines[user_line].split('|')
        points_col = 1
        claimed_col = 2
        completed_col = 3
        bonus_col = 5
        
        if action == "claimed":
            user_line_data[points_col] = str(int(user_line_data[points_col]) + points)
            user_line_data[claimed_col] = str(int(user_line_data[claimed_col]) + 1)
        elif action == "completed":
            user_line_data[points_col] = str(int(user_line_data[points_col]) + points)
            user_line_data[completed_col] = str(int(user_line_data[completed_col]) + 1)
        elif action == "bonus":
            user_line_data[bonus_col] = str(int(user_line_data[bonus_col]) + points)
        
        # Reconstruct the updated line
        lines[user_line] = '|'.join(user_line_data) + '\n'
    else:
        claimed_count = 1 if action == 'claimed' else 0
        completed_count = 1 if action == 'completed' else 0
        bonus_points = points if action == 'bonus' else 0
        new_user_line = f"| {username} | {points} | {claimed_count} | {completed_count} | 0 | {bonus_points} |\n"
        lines.insert(header_index + 1, new_user_line)

    # Write the updated lines back to the file
    with open(file_path, "w") as f:
        f.writelines(lines)

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python update_points_docs.py <username> <points> <action>")
        sys.exit(1)

    username = sys.argv[1]
    points = int(sys.argv[2])
    action = sys.argv[3]
    if action not in ["claimed", "completed", "bonus"]:
        print("Invalid action. Must be 'claimed', 'completed', or 'bonus'.")
        sys.exit(1)
    
    update_points(username, points, action)
