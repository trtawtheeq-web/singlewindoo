"""تحديث قاعدة بيانات BINs قطر الكاملة"""
import json
from pathlib import Path

# Load extracted BINs
with open('/tmp/qatar_bins_complete.json', 'r', encoding='utf-8') as f:
    all_bins = json.load(f)

# Bank logo mapping
BANK_LOGOS = {
    'QNB': '/images/banks/qnb-qatar.png',
    'Commercial Bank': '/images/banks/commercial-bank-qatar.png',
    'QIB': '/images/banks/qib-qatar.png',
    'Masraf Al Rayan': '/images/banks/masraf-al-rayan.png',
    'Doha Bank': '/images/banks/doha-bank-qatar.png',
    'QIIB': '/images/banks/qiib.png',
    'Ahlibank': '/images/banks/ahlibank-qatar.png',
    'Dukhan Bank': '/images/banks/dukhan-bank.png',
    'Al Khaliji': '/images/banks/al-khaliji-bank.jpg',
    'IBQ': '/images/banks/ibq-qatar.jpg',
    'HSBC Qatar': '/images/banks/hsbc-qatar.jpg',
    'Mashreq Qatar': '/images/banks/mashreq-qatar.png',
    'Standard Chartered Qatar': '/images/banks/standard-chartered.png',
    'Arab Bank Qatar': '/images/banks/arab-bank.png',
    'Arab Financial Services': '/images/banks/qnb-qatar.png',
    'Network International': '/images/banks/qnb-qatar.png',
    'Emirates NBD Qatar': '/images/banks/qnb-qatar.png',
    'Citibank Qatar': '/images/banks/qnb-qatar.png',
    'Qatar Airways': '/images/banks/qnb-qatar.png',
    'Unknown': '/images/banks/qnb-qatar.png',
}

# Generate TypeScript code
ts_lines = []
ts_lines.append('// ==================== البنوك القطرية الشاملة ====================')
ts_lines.append('// المصدر: bintable.com/country/qa - 350 BIN')
ts_lines.append('export const QATAR_BINS: Record<string, BinInfo> = {')

# Group by bank for comments
current_bank = None
for bin_num in sorted(all_bins.keys()):
    info = all_bins[bin_num]
    bank = info['bank']
    network = info['network']
    card_type = info['type']
    tier = info['tier']
    
    if bank != current_bank:
        ts_lines.append(f'  // ===== {bank} =====')
        current_bank = bank
    
    ts_lines.append(f"  '{bin_num}': {{ bank: '{bank}', network: '{network}', type: '{card_type}', tier: '{tier}' }},")

ts_lines.append('};')
ts_lines.append('')

# Generate BANK_LOGOS update
ts_lines.append('// شعارات البنوك القطرية')
ts_lines.append('export const QATAR_BANK_LOGOS: Record<string, string> = {')
for bank, logo in BANK_LOGOS.items():
    ts_lines.append(f"  '{bank}': '{logo}',")
ts_lines.append('};')

qatar_ts = '\n'.join(ts_lines)

# Read binDatabase.ts
ts_file = Path('/home/ubuntu/singlewindoo/client/src/lib/binDatabase.ts')
content = ts_file.read_text(encoding='utf-8')

# Replace existing QATAR section
old_start = '// ==================== البنوك القطرية'
old_end = '// قاعدة البيانات الموحدة'

start_idx = content.find(old_start)
end_idx = content.find(old_end)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + qatar_ts + '\n\n' + content[end_idx:]
    ts_file.write_text(new_content, encoding='utf-8')
    print(f"✅ Updated binDatabase.ts with {len(all_bins)} Qatar BINs")
else:
    # Append before the unified database
    print(f"Start idx: {start_idx}, End idx: {end_idx}")
    print("❌ Pattern not found, trying alternative...")
    # Find the unified BIN_DATABASE
    alt_marker = 'export const BIN_DATABASE'
    alt_idx = content.find(alt_marker)
    if alt_idx != -1:
        new_content = content[:alt_idx] + qatar_ts + '\n\n' + content[alt_idx:]
        ts_file.write_text(new_content, encoding='utf-8')
        print(f"✅ Inserted before BIN_DATABASE")
    else:
        print("❌ Could not find insertion point")

# Now update BANK_LOGOS in binDatabase.ts to include Qatar banks
content2 = ts_file.read_text(encoding='utf-8')

# Update the BANK_LOGOS object to include Qatar logos
old_logos_end = "  'Doha Bank Qatar': '/images/banks/doha-bank.png',\n};"
new_logos_end = """  'Doha Bank Qatar': '/images/banks/doha-bank-qatar.png',
  // البنوك القطرية
  'QNB': '/images/banks/qnb-qatar.png',
  'Commercial Bank': '/images/banks/commercial-bank-qatar.png',
  'QIB': '/images/banks/qib-qatar.png',
  'Qatar Islamic Bank': '/images/banks/qib-qatar.png',
  'Masraf Al Rayan': '/images/banks/masraf-al-rayan.png',
  'Doha Bank': '/images/banks/doha-bank-qatar.png',
  'QIIB': '/images/banks/qiib.png',
  'Qatar International Islamic Bank': '/images/banks/qiib.png',
  'Ahlibank': '/images/banks/ahlibank-qatar.png',
  'Dukhan Bank': '/images/banks/dukhan-bank.png',
  'Barwa Bank': '/images/banks/dukhan-bank.png',
  'Al Khaliji': '/images/banks/al-khaliji-bank.jpg',
  'IBQ': '/images/banks/ibq-qatar.jpg',
  'International Bank of Qatar': '/images/banks/ibq-qatar.jpg',
  'HSBC Qatar': '/images/banks/hsbc-qatar.jpg',
  'Mashreq Qatar': '/images/banks/mashreq-qatar.png',
  'Standard Chartered Qatar': '/images/banks/standard-chartered.png',
  'Arab Bank Qatar': '/images/banks/arab-bank.png',
};"""

if old_logos_end in content2:
    content2 = content2.replace(old_logos_end, new_logos_end, 1)
    ts_file.write_text(content2, encoding='utf-8')
    print("✅ Updated BANK_LOGOS with Qatar banks")
else:
    print("❌ BANK_LOGOS end pattern not found")

# Now update the lookupBin function to also check QATAR_BINS
content3 = ts_file.read_text(encoding='utf-8')
old_lookup = "export function lookupBin(bin: string): BinInfo | null {"
new_lookup = """export function lookupBin(bin: string): BinInfo | null {
  // Check Qatar BINs first (more specific)
  for (let len = 6; len >= 4; len--) {
    const prefix = bin.substring(0, len);
    if (QATAR_BINS[prefix]) return QATAR_BINS[prefix];
  }"""

if old_lookup in content3 and 'Check Qatar BINs first' not in content3:
    content3 = content3.replace(old_lookup, new_lookup, 1)
    ts_file.write_text(content3, encoding='utf-8')
    print("✅ Updated lookupBin to check QATAR_BINS first")
else:
    print("ℹ️ lookupBin already updated or pattern not found")

print(f"\n✅ Total Qatar BINs: {len(all_bins)}")
print("Banks covered:")
banks = {}
for info in all_bins.values():
    b = info['bank']
    banks[b] = banks.get(b, 0) + 1
for bank, count in sorted(banks.items(), key=lambda x: -x[1]):
    print(f"  {bank}: {count} BINs")
