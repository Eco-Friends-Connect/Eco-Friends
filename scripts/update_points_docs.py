import sys
import re
from pathlib import Path

def update_points(username, points, action):
    file_path = Path("docs/team-points.md")
    
    if not file_path.exists():
        with open(file_path, "w") as f:
            f.write("# Team Points\n\n")
            f.write("| Username | Points | Tickets Claimed | Tickets Completed | Quality | Bonus Points |\n")
            f.write("|----------|--------|------------------|-------------------|---------|--------------|\n")
    
    with open(file_path, "r") as f:
        lines = f.readlines()
    
    header_index = lines.index("|----------|--------|------------------|-------------------|---------|--------------|\n")
    
    user_line = None
    for i, line in enumerate(lines[header_index+1:], start=header_index+1):
        if line.startswith(f"| {username} "):
            user_line = i
            break
    
    if user_line is not None:
        lines[user_line] = re.sub(r"(\d+)\|", lambda m: str(int(m.group(1)) + points) + "|", lines[user_line])
    else:
        new_user_line = f"| {username} | {points} | 0 | 0 | 0 | 0 |\n"
        lines.insert(header_index + 1, new_user_line)
    
    with open(file_path, "w") as f:
        f.writelines(lines)

    if __name__ == "__main__":
        username = sys.argv[1]
        points = int(sys.argv[2])
        action = sys.argv[3]
        update_points(username, points, action)
