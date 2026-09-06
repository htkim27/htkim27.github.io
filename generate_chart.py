import matplotlib.pyplot as plt
import numpy as np

# Set paper style
plt.style.use('seaborn-v0_8-paper')
plt.rcParams['font.family'] = 'DejaVu Sans'
plt.rcParams['font.size'] = 11

labels = ['CPU Only', 'GPU 24 Layer', '+ Flash Attn', '+ True Streaming']
no_tool = [8.01, 4.84, 4.60, 2.68]
tool_use = [12.10, 7.16, 6.89, 5.69]

x = np.arange(len(labels))
width = 0.35

fig, ax = plt.subplots(figsize=(8, 5))
rects1 = ax.bar(x - width/2, no_tool, width, label='No Tool', color='#4c72b0', edgecolor='black', linewidth=0.5)
rects2 = ax.bar(x + width/2, tool_use, width, label='Tool Use', color='#dd8452', edgecolor='black', linewidth=0.5)

ax.set_ylabel('V2V Latency (s)', fontweight='bold')
ax.set_title('End-to-End V2V Latency Optimization', fontweight='bold', pad=15)
ax.set_xticks(x)
ax.set_xticklabels(labels, fontweight='bold')
ax.legend()

ax.grid(axis='y', linestyle='--', alpha=0.7)
ax.set_axisbelow(True)

def autolabel(rects):
    for rect in rects:
        height = rect.get_height()
        ax.annotate(f'{height:.2f}s',
                    xy=(rect.get_x() + rect.get_width() / 2, height),
                    xytext=(0, 3),
                    textcoords="offset points",
                    ha='center', va='bottom', fontsize=9)

autolabel(rects1)
autolabel(rects2)

fig.tight_layout()
plt.savefig('/home/htkim/dev/htkim27.github.io/content/assets/omni_iot_latency_chart.png', dpi=300, bbox_inches='tight')
print("Chart generated successfully.")
