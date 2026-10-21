import sys,glob,os
from fontTools.ttLib import TTFont
vi="ạảãàáâậầấẩẫăắằặẳẵẽẹẻèéêếềểễệìíịỉĩòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳýỵỷỹđĐ"
base=sys.argv[1]
for d in sorted(os.listdir(base)):
    cov=set()
    for f in glob.glob(f"{base}/{d}/*.woff2"):
        try: cov|=set(TTFont(f).getBestCmap().keys())
        except Exception as e: print(d,f,e)
    miss=[c for c in vi if ord(c) not in cov]
    print(f"{d:12s} total={len(cov):6d} vi_missing={len(miss)}/{len(vi)} {''.join(miss[:30])}")
